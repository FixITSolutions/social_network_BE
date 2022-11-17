const { User } = require('../models/databaseConnector');
const { Post } = require('../models/databaseConnector');

class ProfileCommand {
    constructor() {

    }
    async getUser(id) {
        const user = await User.findOne({ where: { id } })
        const userPosts = await Post.findAll({ where: { userId: id } })
        return { userDetails: user, userPosts }
    }

    async updateUser(id, editedUser) {
        try {
            await User.update(editedUser, { where: { id: id }, })
            return { 
                success: true,
                message: 'Post updated successfully' 
            };
        } catch (e) {
            return { 
                success: false,
                message: 'error' + e
            }
        }
    }
}

module.exports = ProfileCommand;