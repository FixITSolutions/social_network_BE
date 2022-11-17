const { DataTypes } = require('sequelize')

const Like = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
};

module.exports = Like;