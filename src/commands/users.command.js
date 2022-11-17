const { User } = require('../models/databaseConnector');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const config = require('config');

class UserCommand {
    constructor() {

    }
    async createUser(user) {
        if (!user.email || !user.password || !user.name) {
            throw new Error('Missing one required paramenter from USER');
        }
        if (user.password.length < 6) {
            throw new Error('Password doesn\'t have minimum 6 characters');
        }
        // TODO: make check for user.email is valid ()
        const expression = /\S+@\S+/; //Regex to check if email has something@something
        if (!expression.test(String(user.email).toLowerCase())) {
            throw new Error('Email is not a valid format');
        }
        // TODO: check if email already in DB
        const emailUser = user.email;
        const doubleEmail = await User.findOne({ where: { email: emailUser } });
        if (doubleEmail) {
            throw new Error('Email is already in DB');
        };
        //build user
        const userBuilt = await User.build(user);
        const avaratSrc = 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg'
        userBuilt.avatar = avaratSrc;
        //hash password before storing it in DB
        userBuilt.password = md5(userBuilt.password);
        await userBuilt.save();
        await userBuilt.reload();
        const userRaw = { id: userBuilt.id, name: userBuilt.name, email: userBuilt.email };

        const token = await this.createToken(userRaw);
        return { token, email: user.email, id: user.id, name: user.name };
    }

    async createToken(user) {
        const token = await jwt.sign(user, config.get('secret'));
        return token;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new Eroor('No user found');
        }
        if (user.password !== md5(password)) {
            throw new Error('Password doen\' match');
        }
        const token = await this.createToken({ email, id: user.id, name: user.name });
        return { token, email, id: user.id, name: user.name };
    }

    async allUsers() {
        const allUsers = await User.findAll({ options: Object });
        if (!allUsers) {
            throw new Error('No users found in DB')
        }
        const usersArray = [];
        allUsers.forEach(element => {
            usersArray.push(element.dataValues)
        });
        return { numberOfUsers: allUsers.length, usersArray }
    }
}
module.exports = UserCommand;