const MessageService = require("../services/MessageServices");
const messageService = new MessageService();
const UserService = require("../services/UserServices");
const userService = new UserService();


const createMessageController = async (req, res) => {
    try {
        let sender = req.user.id
        req.user.role == "council" ? receiver = req.body.receiver : receiver = (await userService.findCouncilId()).data
        let { content } = req.body
        if (!sender || !receiver || !content) throw new Error("All fields are required");
        let data = { sender, receiver, content };
        let message = await messageService.createMessage(data)
        if (!message) throw new Error("Error Creating Message")
        res.status(200).json({
            success: true,
            data: message.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const getMessagesController = async (req, res) => {
    try {
        let id = req.user.id;
        let messages = await messageService.getMessagesByUserId(id);
        if (!messages.success) throw new Error("No messages found");
        res.status(200).json({
            success: true,
            data: messages.data
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const updateMessageController = async (req, res) => {
    try {
        let id = req.params.id;
        let message = await messageService.updateMessage(id, { read: true });
        if (!message) throw new Error("Error Updating Message")
        res.status(200).json({
            success: true,
            data: message.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const deleteMessageController = async (req, res) => {
    try {
        let id = req.params.id;
        let message = await messageService.deleteMessage(id);
        if (!message) throw new Error("Error Deleting Message")
        res.status(200).json({
            success: true,
            data: message.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = {
    createMessageController,
    getMessagesController,
    updateMessageController,
    deleteMessageController
}