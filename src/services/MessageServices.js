const Message = require("../models/message");

class MessageService {

    async createMessage(data) {
        const { sender, receiver, content } = data;
        const newMessage = new Message({
            sender,
            receiver,
            content
        });
        await newMessage.save();
        if (!newMessage) throw new Error("Message creation failed");
        return {
            success: true,
            data: newMessage
        }
    }

    async getMessagesByUserId(userId) {
        const messages = await Message.find({
            $or: [
            { receiver: userId },
            { sender: userId }
            ]
        });
        if (!messages) throw new Error("No messages found");
        return {
            success: true,
            data: messages
        }
    }

    async updateMessage(id, { read }) {
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { read },
            { new: true });
        if (!updatedMessage) throw new Error("Message update failed");
        return {
            success: true,
            data: updatedMessage
        }
    }

    async deleteMessage(id) {
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) throw new Error("Message deletion failed");
        return {
            success: true,
            data: deletedMessage
        }
    }

}

module.exports = MessageService;