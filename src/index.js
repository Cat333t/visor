const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
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
    baseURL: process.env.BASE_URL || 'http://localhost:4000',
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Middleware
app.use(auth(config));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000', 'https://visor-app.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true
}));

// Routes
app.use('/api', routes);

app.get('/signin', (req, res) => {
    res.oidc.login({ returnTo: '/' });
});

app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        express.static(path.join(__dirname, '../client/build'))
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
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
