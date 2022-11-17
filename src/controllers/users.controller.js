const express = require('express');
const router = express.Router();
const UserCommand = require('../commands/users.command');
const isAuth = require('../middlewares/auth.middleware');


router.post('/', async(req, res) => {
    const user = req.body;
    const userCommand = new UserCommand();
    try {
        const result = await userCommand.createUser(user);
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/login', async(req, res) => {
    const payload = req.body;
    const userCommand = new UserCommand();
    try {
        const result = await userCommand.login(payload.email, payload.password);
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;