const express = require('express');
const { authenticateUserwebtoken } = require('../middlewares/authenticate');
const { canUpdate } = require('../middlewares/votepermission');
const { createVoteController } = require('../controllers/VoteController');
const router = express.Router();

router.use(express.json());

router.post("/:petitionId", authenticateUserwebtoken, canUpdate, createVoteController);
router.delete("/:petitionId", authenticateUserwebtoken, canUpdate, createVoteController);

module.exports = router;