const AuthenticationService = require("../services/AuthServices");
const authService = new AuthenticationService();

export const registerController = async (req, res) => {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password) throw new Error("All fields are required");
        if (!authService.isValidStudentEmail(email)) throw new Error("Invalid email address");
        let register = await authService.registerUser(req.body);
        if (!register.success) throw new Error("Registration failed");
        res.json({
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