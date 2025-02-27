const express = require('express');
const { authenticateUserwebtoken, isCouncil } = require("../middlewares/authenticate")
const { getAllPetitionsController, createMergedPetitionController, updatePetitionController } = require("../controllers/CouncilController")
const router =  express.Router();

router.use(express.json())

router.get("/petitions", authenticateUserwebtoken, isCouncil, getAllPetitionsController)
router.post("/merge", authenticateUserwebtoken, isCouncil, createMergedPetitionController)
router.put("/council", authenticateUserwebtoken, isCouncil, updatePetitionController)

module.exports = router