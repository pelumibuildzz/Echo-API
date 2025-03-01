const express = require('express');
const { authenticateUserwebtoken } = require('../middlewares/authenticate');
const { createMessageController, getMessagesController, updateMessageController, deleteMessageController } = require('../controllers/MessageController');
const { isPermitted } = require('../middlewares/messagepermission');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", authenticateUserwebtoken, createMessageController)
router.get("/", authenticateUserwebtoken, getMessagesController)
router.put("/:id", authenticateUserwebtoken, isPermitted, updateMessageController)
router.delete("/:id", authenticateUserwebtoken, isPermitted, deleteMessageController)