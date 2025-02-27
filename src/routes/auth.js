const express = require('express');
const { registerController, loginController } = require('../controllers/AuthController');
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.json({msg: "Welcome To Echo API Authe!"});
});

router.post("/register", registerController)
router.post("/login", loginController)

module.exports = router;