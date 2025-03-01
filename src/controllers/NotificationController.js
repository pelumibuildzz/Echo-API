const NotificationService = require("../services/NotificationServices");
const notificationService = new NotificationService();

const createNotificationController = async (req, res) => {
    try {
        let { user, petition, message } = req.body
        if (!user || !message) throw new Error("User and Message fields are required");
        let data = { user, petition, message };
        let notification = await notificationService.createNotification(data)
        if (!notification) throw new Error("Error Creating Notification")
        res.status(200).json({
            success: true,
            data: notification.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const getNotificationController = async (req, res) => {
    try {
        if (req.user.role == "council"){
            let id = req.params.id;
            let notifications = await notificationService.getNotificationsByUserId(id);
            if (!notifications.success) throw new Error("No notifications found");
            res.status(200).json({
                success: true,
                data: notifications.data
            });
        }else{
            let id = req.user.id;
            let notifications = await notificationService.getNotificationsByUserId(id);
            if (!notifications.success) throw new Error("No notifications found");
            res.status(200).json({
                success: true,
                data: notifications.data
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const updateNotificationController = async (req, res) => {
    try {
        let { read } = req.body
        let id = req.params.id;
        if (!read) throw new Error("Read field is required")
        let notification = await notificationService.updateNotification(id, { read })
        if (!notification) throw new Error("Error Updating Notification")
        res.status(200).json({
            success: true,
            data: notification.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const deleteNotificationController = async (req, res) => {
    try {
        let id = req.params.id;
        let notification = await notificationService.deleteNotification(id);
        if (!notification) throw new Error("Error Deleting Notification")
        res.status(200).json({
            success: true,
            data: notification.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = {
    createNotificationController,
    getNotificationController,
    updateNotificationController,
    deleteNotificationController
}