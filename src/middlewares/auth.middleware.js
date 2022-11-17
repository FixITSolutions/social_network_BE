const jwt = require('jsonwebtoken');
const config = require('config');

async function isAuth(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) {
        res.status(401).json({ error: 'You must be authenticated' });
        return;
    }
    const parts = header.split(' ');
    if (parts[0] !== 'Bearer') {
        res.status(401).json({ error: 'You must be authenticated' });
        return;
    }
    if (!parts[1]) {
        res.status(401).json({ error: 'You must be authenticated' });
        return;
    }
    try {
        const decoded = await jwt.verify(parts[1], config.get('secret'));
        if (!decoded) {
            res.status(401).json({ error: 'You must be authenticated' });
            return;
        }
        req.user = decoded;
        await next();
    } catch {
        res.status(401).json({ error: 'You must be authenticated' });
        return;
    }
}

module.exports = isAuth;