const express = require('express');
const router = express.Router();
const AdminCommand = require('../commands/admin.command');
const isAuth = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');

// route to get all users from DB
router.get('/allusers', isAuth, isAdmin, async(req, res) => {
    const adminCommand = new AdminCommand();
    try {
        const userList = await adminCommand.allUsers();
        res.json({ message: ' All users', user: userList });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;