const User = require("../models/user.model");

class UserService {
    create(userData) {
        return User.create(userData);
    }

    getAll() {
        return User.findAll();
    }

    getOne({id}) {
        return User.findOne({ where: { id } });
    }

    async update(userData) {
        const user = await this.getOne({id: userData.id});

        return user.update(userData);
    }
}

module.exports = new UserService();