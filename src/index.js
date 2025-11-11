import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import routes from './routes/api.js';

const app = express();
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 4000;
const dirname = path.join(path.dirname(import.meta.url), '../').replace('file:', '');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// Middlewares
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

// Static files
app.use(express.static(path.resolve(dirname, 'public')));

async function createServer() {
    // API routes
    app.use('/api', routes);

    // Auth0 routes
    app.get('/login', (req, res) => {
        res.oidc.login({ returnTo: '/' });
    });
    app.get('/signout', (req, res) => {
        res.oidc.logout({ returnTo: '/' });
    });

    let vite;

    // app.use((req, res, next) => {
    //     res.send(`Production: ${process.env.NODE_ENV}.` + ` Vercel: ${process.env.VERCEL}.`);
    // })

    if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
        const { createServer: createViteServer } = await import('vite');
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

    // SSR middleware
    app.use(async (req, res, next) => {
        if (res.headersSent) return;

        const url = req.originalUrl;

        try {
            if (!req.headers.accept?.includes('text/html')) {
                next();
                return
            }

            let template;
            if (vite) {
                // Dev
                template = fs.readFileSync(path.join(dirname, 'client/index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);

                const { render } = await vite.ssrLoadModule('../src/entry-server.jsx');
                const appHtml = await render(url);

                let html = template.replace('<!--ssr-outlet-->', appHtml);

                const styleFiles = fs.readdirSync(path.resolve(dirname, 'public/styles')).filter(f => f.endsWith('.css'));

                for (const styleFile of styleFiles) {
                    html = html.replace("<!--preload-css-->", `<!--preload-css--> \n    <link rel="preload" as="style" href="/styles/${styleFile}">\n    <link rel="stylesheet" href="/styles/${styleFile}" />\n`);
                }

                res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
            } else {
                // Prod
                if (!fs.existsSync(path.resolve(dirname, 'dist/client/index.html'))) { // test if build is done
                    console.error('Build not found. Please run the build process before starting the production server.');
                    return res.status(500).end('Build not found. Please wait until administration completes the build process. Thank you for your patience.');
                }
                
                template = fs.readFileSync(path.resolve(dirname, 'dist/client/index.html'), 'utf-8');

                const { render } = await import(path.resolve(dirname, 'dist/server/entry-server.js'));
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

    if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL || process.env.VERCEL !== '1') {
        app.listen(PORT, HOST, async () => {
            console.clear();
            console.log(`
                    ░█──░█ ▀█▀ ░█▀▀▀█ ░█▀▀▀█ ░█▀▀█
                    ─░█░█─ ░█─ ─▀▀▀▄▄ ░█──░█ ░█▄▄▀
                    ──▀▄▀─ ▄█▄ ░█▄▄▄█ ░█▄▄▄█ ░█─░█
                `);
            if (process.env.NODE_ENV !== 'production') {
            const os = await import('os');
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
    } else {
        console.log('Production server ready!');
    }

    return app;
}

const server = await createServer();
export default server;