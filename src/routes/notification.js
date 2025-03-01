const express = require('express');
const { authenticateUserwebtoken, isCouncil } = require('../middlewares/authenticate');
const { createNotificationController, getNotificationController, updateNotificationController, deleteNotificationController } = require('../controllers/NotificationController');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", authenticateUserwebtoken, isCouncil, createNotificationController)
router.get("/", authenticateUserwebtoken, getNotificationController)
router.put("/:id", authenticateUserwebtoken, isCouncil , updateNotificationController)
router.delete("/:id", authenticateUserwebtoken, isCouncil, deleteNotificationController)

module.exports = router;