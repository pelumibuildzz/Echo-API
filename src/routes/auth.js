const express = require('express');
const { registerController, loginController } = require('../controllers/AuthController');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    res.json({msg: "Welcome To Echo API Auth System!"});
});

router.post("/register", registerController)
router.post("/login", loginController)

module.exports = router;