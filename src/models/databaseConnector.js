const Sequelize = require('sequelize');
const config = require('config');
const UserModel = require('./user.model');
const PostModel = require('./post.model');
const LikeModel = require('./like.model');
const CommentModel = require('./comment.model');

const dbConfig = {
    database: config.get('mysql.database'),
    username: config.get('mysql.username'),
    password: config.get('mysql.password'),
    host: config.get('mysql.host'),

};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
});

const User = sequelize.define("user", UserModel);
const Post = sequelize.define("post", PostModel);
const Like = sequelize.define("like", LikeModel);
const Comment = sequelize.define("comment", CommentModel);

User.hasMany(Post);
User.hasMany(Like);
User.hasMany(Comment);
Post.hasMany(Comment);
Post.hasMany(Like);
Post.belongsTo(User);
Comment.belongsTo(User);

module.exports = { sequelize, User, Post, Like, Comment };