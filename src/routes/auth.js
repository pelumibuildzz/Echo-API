const express = require('express');
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.json({msg: "Welcome To Echo API Authe!"});
});


module.exports = router;