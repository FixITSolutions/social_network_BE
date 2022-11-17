const { DataTypes } = require('sequelize')

const Comment = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.STRING,
    }
};

module.exports = Comment;