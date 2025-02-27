const express = require('express');
const { getPetitionsController } = require('../controllers/PetitionController');
const { authenticateUserwebtoken, isCouncil } = require('../middlewares/authenticate');
const { isAllowed } = require('../middlewares/petitionpermission');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", getPetitionsController)
router.get("/:id", getPetitionsController)
router.put("/:id", authenticateUserwebtoken, isCouncil, getPetitionsController)
router.delete("/:id", authenticateUserwebtoken, isAllowed, getPetitionsController)

module.exports = router;