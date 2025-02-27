const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class AuthenticationService {

    async registerUser(userData) {
        const {name, email, password } = userData;
        const userExists = await user.findOne({ email });
        if (userExists) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return {
            success: true,
            data: newUser
        }
    }

    async loginUser(userData) {
        const { email, password } = userData;
        const userExists = await user.findOne({ email });
        if (!userExists) {
            throw new Error("User does not exist");
        }
        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }
        const token = this.generateToken(userExists);
        return {
            success: true,
            data: token
        }
    }

    isValidStudentEmail(email) {
        const studentEmailRegex = /^[A-Za-z]+\.[0-9]{7}@stu\.cu\.edu\.ng$/;
        return studentEmailRegex.test(email);
    }

    generateToken(user) {
        return jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
    }

}

module.exports = AuthenticationService