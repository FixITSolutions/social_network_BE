const config = require('config');

async function isAdmin(req, res, next) {
    const userEmail = req.user.email;
    // console.log(userEmail)
    const adminEmailArray = config.get('adminEmails');
    // console.log(adminEmailArray);
    const adminCheck = adminEmailArray.includes(userEmail);
    if (!adminCheck) {
        res.status(403).json({ error: 'Forbidden access' });
        return;
    }
    next();
}

module.exports = isAdmin;