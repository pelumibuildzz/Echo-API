const petition = require('../models/petition');
const { createTelegramPoll } = require("../telegram/pollService");
const NotificationService = require("./NotificationServices");
const notificationService = new NotificationService();

class PetitionService {

    async createPetition(petitionData) {
        const { title, category, creator, description } = petitionData;
        const newPetition = new petition({
            title,
            category,
            creator,
            description
        });
        await newPetition.save();
        if (!newPetition) throw new Error("Petition creation failed");
        await createTelegramPoll(newPetition)
        return {
            success: true,
            data: newPetition
        }
    }

    async getPetitions({category, status, creator}) {
        const petitions = await petition.find({category, status, creator});
        if (!petitions) throw new Error("No petitions found");
        return {
            success: true,
            data: petitions
        }
    }

    async getPetitionByTelegramPollId(telegramPollId) {
        const petition = await petition.findOne({telegramPollId: telegramPollId})
        if (!petition) throw new Error("No petition found");
        return {
            success: true,
            data: petition
        }
    }

    async getPetitionById(id) {
        const petitionData = await petition.findById(id);
        if (!petitionData) throw new Error("Petition not found");
        return {
            success: true,
            data: petitionData
        }
    }

    async updatePetition(id, petitionData) {
        const { status } = petitionData;
        const updatedPetition = await petition.findByIdAndUpdate(id, {
            status
        }, { new: true });
        if (!updatedPetition) throw new Error("Petition update failed");
        await notificationService.createNotification({
            user: updatedPetition.creator,
            petition: updatedPetition._id,
            message: `Your Petition Titled: ${updatedPetition.title} has been Updated to ${status} Status!!!`
        })
        return {
            success: true,
            data: updatedPetition
        }
    }

    async deletePetition(id) {
        let petition = await petition.findByIdAndDelete(id);
        if (!petition) throw new Error("Petition deletion failed");
        return {
            success: true,
            message: "Petition deleted successfully"
        }
    }

}

module.exports = PetitionService