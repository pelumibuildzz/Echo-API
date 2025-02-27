const express = require('express');
const { getPetitionsController } = require('../controllers/PetitionController');
const router = express.Router();

router.use(express.json());

router.get("/", getPetitionsController)
router.get("/:id", getPetitionsController)
router.post("/", getPetitionsController)
router.put("/:id", getPetitionsController)
router.delete("/:id", getPetitionsController)

module.exports = router;