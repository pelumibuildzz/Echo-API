const express = require('express');
const { getPetitionsController } = require('../controllers/PetitionController');
const { authenticateUserwebtoken, isCouncil } = require('../middlewares/authenticate');
const { isAllowed } = require('../middlewares/petitionpermission');
const router = express.Router();

router.use(express.json());

router.get("/", getPetitionsController)
router.get("/:id", getPetitionsController)
router.post("/", authenticateUserwebtoken,  getPetitionsController)
router.put("/:id", authenticateUserwebtoken, isCouncil, getPetitionsController)
router.delete("/:id", authenticateUserwebtoken, isAllowed, getPetitionsController)

module.exports = router;