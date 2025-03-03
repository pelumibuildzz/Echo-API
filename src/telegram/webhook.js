// src/telegram/webhook.js
const express = require("express");
const { updateByWebhookController } = require("./webhookController")
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/telegram-webhook", updateByWebhookController);

module.exports = router;
