const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const { auth } = require('express-openid-connect');
require('dotenv').config({ path: '.env' });

const routes = require('./routes/api');


const app = express();

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 4000;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Middleware
app.use(auth(config));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", config.issuerBaseURL],
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:4000',
        'https://visor-app.vercel.app',
        ...(process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',').filter(o => o !== '')
            : [])
    ],
    methods: ['GET', 'POST', 'HEAD'],
    credentials: true
}));

// Routes
app.use('/api', routes);

app.get('/login', (req, res) => {
    res.oidc.login({ returnTo: '/' });
});

app.get('/signout', (req, res) => {
    res.oidc.logout({ returnTo: '/' });
});

if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../client/build');
    if (fs.existsSync(path.join(buildPath, 'index.html'))) {
        app.use(express.static(buildPath)); 
    } else {
        console.error('Production build not found');
    }
}

app.use((req, res) => {
    if (process.env.NODE_ENV === 'production') {
        const indexPath = path.join(__dirname, '../client/build/index.html');
        res.sendFile(indexPath);
    } else {
        res.redirect('http://localhost:3000' + req.url);
    }
});

// Start server
app.listen(PORT, HOST, () => {
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
        console.log(`Server running at:`);
        addresses.forEach(address => {
            console.log(`    - http://${address}:${PORT}`);
        });
        console.log(`    - http://localhost:${PORT}`);
    } else {
        console.log(`Production server running!`);
    }
});
