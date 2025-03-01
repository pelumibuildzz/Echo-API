const User = require("../models/user");

class UserService {

    async findCouncilId() {
        const council = await User.findOne({ role: "council" });
        if (!council) throw new Error("Council not found");
        let councilId = council._id;
        return {
            success: true,
            data: councilId
        }
    }

}

module.exports = UserService;