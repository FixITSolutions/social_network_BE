const express = require('express');
const router = express.Router();
const ProfileCommand = require('../commands/profile.commands')
const isAuth = require('../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({ dest: 'src/public/uploads/' })

router.get('/', isAuth, async(req, res) => {
    const profileCommand = new ProfileCommand();
    const id = req.user.id;
    try {
        const result = await profileCommand.getUser(id);
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.put('/', isAuth, async(req, res) => {
    const id = req.user.id;
    const profileCommand = new ProfileCommand();
    const editedUser = req.body;
    try {
        const result = await profileCommand.updateUser(id, editedUser);
        res.json(result)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post('/photo', upload.single('file'), async(req, res) => {
    const file = req.file
    console.log(file)
    if (!file.mimetype.match(/image\/*/)) {
        throw new Eroor('File is not of type image');
    }
    if (file.size > 1000000) {
        throw new Eroor('File is to big(>1MB)');
    }
    if (!file) {
        throw new Eroor('Please upload a file')
    }
    // console.log(file)
    const filename = file.filename;
    const url = '/uploads/' + filename;
    // console.log(url)
    res.json(url)
})


module.exports = router;