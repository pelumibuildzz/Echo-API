const AuthenticationService = require("../services/AuthServices");
const authService = new AuthenticationService();

const registerController = async (req, res) => {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password) throw new Error("All fields are required");
        if (!authService.isEmail(email)) throw new Error("Invalid email address");
        let data = { name, email, password };
        let register = await authService.registerUser(data);
        console.log(register);
        if (!register.success) throw new Error("Registration failed");
        res.status(200).json({
            success: true,
            data: {
                name: register.data.name,
                email: register.data.email,
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const loginController = async (req, res) => {
    try {
        let { email, password } = req.body
        if( !email || !password ) throw new Error("Email and Password are required");
        if (!authService.isEmail(email)) throw new Error("Invalid email address");
        let data = { email, password };
        let login = await authService.loginUser(data);
        if (!login.success) throw new Error("Login failed");
        res.json({
            success: true,
            data: login.data
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}


module.exports = { registerController, loginController };