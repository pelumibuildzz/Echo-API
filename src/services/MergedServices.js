const MergedPetition = require("../models/mergedPetition");
const Petition = require("../models/petition");

class MergedPetitionService {

    async createMergedPetition(mergedPetitionData) {
        const { petitions, mergedBy } = mergedPetitionData;

        petitions.forEach(async (petition) => {
            let petitionData = await Petition.findById(petition)
            if (!petitionData) throw new Error("Error Finding Petitions")
        })

        const newMergedPetition = new MergedPetition({
            petitions,
            mergedBy
        });
        await newMergedPetition.save();
        if (!newMergedPetition) throw new Error("Merged Petition creation failed");
        return {
            success: true,
            data: newMergedPetition
        }
    }

    async getMergedPetitionById(id) {
        const mergedPetition = await MergedPetition.findById(id);
        if (!mergedPetition) throw new Error("Merged Petition not found");
        return {
            success: true,
            data: mergedPetition
        }
    }

    async getMergedPetitions() {
        const mergedPetitions = await MergedPetition.find();
        if (!mergedPetitions) throw new Error("No merged petitions found");
        return {
            success: true,
            data: mergedPetitions
        }
    }

    async updateMerge(id, { petitionIds, status }) {
        if (petitionIds){
            const updatedMerge = await MergedPetition.findByIdAndUpdate(
                id,
                { $push: { petitions: { $each: petitionIds } } },
                { new: true });
            if (!updatedPetition) throw new Error("Petition update failed");
            return {
                success: true,
                data: updatedMerge
            }
        }else if (status){
            const Merged = await MergedPetition.findById(id);
            if (!Merged) throw new Error("Merged Petion not Found");
            let petitions = updatedPetition.petitions;
            petitions.forEach(async (petition) => {
                let updatedPetition = await Petition.findByIdAndUpdate(petition, { status }, { new: true });
                if (!updatedPetition) throw new Error("Petition update failed");
            })
            return {
                success: true,
                data: updatedPetition
            }
        }
    }

    async deleteMergedPetition(id) {
        let mergedPetition = await MergedPetition.findByIdAndDelete(id);
        if (!mergedPetition) throw new Error("Merged Petition deletion failed");
        return {
            success: true,
            message: "Merged Petition deleted successfully"
        }
    }

    async getPetitionfromMerge(id) {
        const mergedPetition = await MergedPetition.findById(id);
        if (!mergedPetition) throw new Error("Merged Petition not found");
        let petitions = mergedPetition.petitions;
        let mergedPetitionData = {
            _id: mergedPetition._id,
            title: "",
            category: "",
            status: "",
            createdBy: [],
            votes: 0
        };
        petitions.forEach(async (petition, index) => {
            let petitionData = await Petition.findById(petition);
            if (!petitionData) throw new Error("Petition not found");
            if (index == 0) {
                mergedPetitionData.title = petitionData.title
                mergedPetitionData.category = petitionData.category
                mergedPetitionData.status = petition.status
            };
            mergedPetitionData.createdBy = mergedPetition.push(petitionData.createdBy);
            mergedPetitionData.votes = mergedPetition + petitionData.votes;
        });
        return mergedPetitionData;
    }
}

module.exports = MergedPetitionService