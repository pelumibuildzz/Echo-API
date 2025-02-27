const express = require('express');
const { registerController, loginController, getmyInfoController } = require('../controllers/AuthController');
const { authenticateUserwebtoken } = require('../middlewares/authenticate');
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.json({msg: "Welcome To Echo API Authe!"});
});

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/me", authenticateUserwebtoken, getmyInfoController)

module.exports = router;