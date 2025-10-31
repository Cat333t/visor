const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const { createServer: createViteServer } = require('vite');
const { auth } = require('express-openid-connect');
require('dotenv').config({ path: '.env' });
const routes = require('./routes/api'); // Ваш API-роутер

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 4000;
const dirname = path.resolve(path.dirname(require.main.filename), "..");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// Глобальные middleware (до createServer)
app.use(compression({ threshold: 0 }));
app.use(auth(config));

app.use(
    helmet.contentSecurityPolicy({
        directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: [
            "'self'",
            config.issuerBaseURL,
            ...(process.env.NODE_ENV !== 'production' ? ['ws://localhost:24678'] : []),
        ],
        },
    })
);

app.use(
    cors({
        origin: [
        'http://localhost:3000',
        'http://localhost:4000',
        'https://visor-app.vercel.app',
        ...(process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(o => o)
            : []),
        ],
        methods: ['GET', 'POST', 'HEAD'],
        credentials: true,
    })
);

// Public статика (до Vite)
app.use(express.static(path.resolve(dirname, 'public')));

async function createServer() {
    // API роуты (независимо от dev/prod)
    app.use('/api', routes);

    // Auth0 роуты
    app.get('/login', (req, res) => {
        res.oidc.login({ returnTo: '/' });
    });
    app.get('/signout', (req, res) => {
        res.oidc.logout({ returnTo: '/' });
    });

    let vite;
    if (process.env.NODE_ENV !== 'production') {
        // Dev: Vite middleware
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom',
            base: '/',
            root: path.resolve(dirname, 'client'),
            logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'info',
        });
        app.use(vite.middlewares);
    } else {
        app.use(
            express.static(path.resolve(dirname, 'dist/client'), {
                maxAge: '1y',
                immutable: true,
                index: false,
            })
        );
    }

    // SSR хэндлер (для всех путей)
    app.use(async (req, res, next) => {
        if (res.headersSent) return; // Пропуск, если файл уже отдан

        const url = req.originalUrl;

        try {
            // Только для HTML-запросов
            if (!req.headers.accept?.includes('text/html')) {
                return next();
            }

            let template;
            if (vite) {
                // Dev
                template = fs.readFileSync(path.resolve(dirname, 'client/index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);

                const { render } = await vite.ssrLoadModule('../src/entry-server.jsx');
                const appHtml = await render(url);

                let html = template.replace('<!--ssr-outlet-->', appHtml);

                // Динамический preload CSS/JS (лучше, чем хардкод)
                const styleFiles = fs.readdirSync(path.resolve(__dirname, '../public/styles')).filter(f => f.endsWith('.css'));

                for (const styleFile of styleFiles) {
                    html = html.replace("<!--preload-css-->", `<!--preload-css--> \n    <link rel="preload" as="style" href="/styles/${styleFile}">\n    <link rel="stylesheet" href="/styles/${styleFile}" />\n`);
                }

                res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
            } else {
                // Prod
                template = fs.readFileSync(path.resolve(dirname, 'dist/client/index.html'), 'utf-8');

                const { render } = require(path.resolve(dirname, 'dist/server/entry-server.js'));
                const appHtml = await render(url);

                const html = template.replace('<!--ssr-outlet-->', appHtml);
                res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
            }
        } catch (e) {
            if (vite) {
                vite.ssrFixStacktrace(e);
            }
            console.error(e);
            next(e);
        }
    });

    // Глобальный error handler
    app.use((err, req, res, next) => {
        res.status(500).json({ error: 'Internal Server Error' });
    });

    // Запуск сервера
    app.listen(PORT, HOST, () => {
        console.clear();
        console.log(`
                ░█──░█ ▀█▀ ░█▀▀▀█ ░█▀▀▀█ ░█▀▀█
                ─░█░█─ ░█─ ─▀▀▀▄▄ ░█──░█ ░█▄▄▀
                ──▀▄▀─ ▄█▄ ░█▄▄▄█ ░█▄▄▄█ ░█─░█
            `);
        if (process.env.NODE_ENV !== 'production') {
        const os = require('os');
        const interfaces = os.networkInterfaces();
        let addresses = [];
        for (let iface in interfaces) {
            for (let alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                addresses.push(alias.address);
            }
            }
        }
        console.log('Server running at:');
        addresses.forEach(address => {
            console.log(` - http://${address}:${PORT}`);
        });
        console.log(` - http://localhost:${PORT}`);
        } else {
        console.log('Production server running!');
        }
    });

    return app; // Для тестов
}

// Вызов (теперь с await, т.к. async)
createServer().catch(console.error);