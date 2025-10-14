const express = require('express');

const router = express.Router();

router.post('/auth/signin', (req, res) => {
    // Redirect to Auth0 login
    res.oidc.login({ returnTo: '/' });
});

router.post('/auth/signout', (req, res) => {
    res.oidc.logout({ returnTo: '/' });
});

router.post('/link-accounts', async (req, res) => {
    try {
        const secondaryUserId = req.body.secondary_user_id;
        if (!secondaryUserId) return res.status(400).json({ error: 'secondary_user_id required' });

        const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_SECRET,
                audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
                grant_type: 'client_credentials'
            })
        });

        const data = await response.json();
        const token = data.access_token;
        console.log('Management API Token:', token);

        const primaryUserId = req.oidc.user.sub;

        const response2 = await fetch(
        `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${primaryUserId}/identities`,
        {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                provider: secondaryUserId.split('|')[0],
                user_id: secondaryUserId.split('|')[1]
            })
        }
        );

        if (!response2.ok) {
            const error = await response2.json();
            throw new Error(error.message || 'Failed to link accounts');
        }

        res.json({ success: true, message: 'Accounts linked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/auth/profile', async (req, res) => {
    if (!req.oidc.isAuthenticated()) return res.status(401).json({ success: false, message: 'User not authenticated' });

    try {
        const userId = req.oidc.user.sub;

        // Получаем Management API token
        const tokenResp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_SECRET,
            audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
            grant_type: 'client_credentials'
        })
        });

        const tokenData = await tokenResp.json();
        const mgmtToken = tokenData.access_token;

        const userResp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${encodeURIComponent(userId)}`, {
        headers: { Authorization: `Bearer ${mgmtToken}` }
        });

        if (!userResp.ok) throw new Error('Failed to fetch user profile: ' + (await userResp.text()));

        const profile = await userResp.json();
        res.json({ success: true, user: profile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/update-profile', async (req, res) => {
    const { username, email, password } = req.body;
    if (!req.oidc.isAuthenticated()) return res.status(401).json({ success: false });

    try {
        // Получаем токен для Management API
        const tokenResp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_SECRET,
                audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
                grant_type: 'client_credentials'
            })
        });

        const { access_token } = await tokenResp.json();

        // Обновление профиля
        const updateResp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${req.oidc.user.sub}`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!updateResp.ok) {
            const error = await updateResp.json();
            throw new Error(error.message);
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});


router.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
})

module.exports = router;
