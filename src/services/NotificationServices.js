const notifications = require("../models/notification")

class NotificationService {

    async createNotification(data) {
        const { user, petition, message } = data;
        const newNotification = new notifications({
            user,
            petition,
            message
        });
        await newNotification.save();
        if (!newNotification) throw new Error("Notification creation failed");
        return {
            success: true,
            data: newNotification
        }
    }



    async getNotificationsByUserId(userId) {
        const notifications = await notifications.find({ user: userId });
        if (!notifications) throw new Error("No notifications found");
        return {
            success: true,
            data: notifications
        }
    }

    async updateNotification(id, { read }) {
        const updatedNotification = await notifications.findByIdAndUpdate(
            id,
            { read },
            { new: true });
        if (!updatedNotification) throw new Error("Notification update failed");
        return {
            success: true,
            data: updatedNotification
        }
    }

    async deleteNotification(id) {
        const deletedNotification = await notifications.findByIdAndDelete(id);
        if (!deletedNotification) throw new Error("Notification deletion failed");
        return {
            success: true,
            data: deletedNotification
        }
    }
}

module.exports = NotificationService;