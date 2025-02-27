const petition = require('../models/petition');

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
        return {
            success: true,
            data: newPetition
        }
    }

    async getPetitions({category, status}) {
        const petitions = await petition.find({category, status});
        if (!petitions) throw new Error("No petitions found");
        return {
            success: true,
            data: petitions
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