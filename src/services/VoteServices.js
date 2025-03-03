const votes = require("../models/vote");	
const Petition = require('../models/petition');

class VoteService {

    async createVote(voteData) {
        const { user, petition } = voteData;
        const newVote = new votes({
            user,
            petition
        });
        await newVote.save();
        if (!newVote) throw new Error("Vote creation failed");
        let updatedPetition = await Petition.findByIdAndUpdate(petition, { $inc : { votes: 1 } }, { new: true });
        if (!updatedPetition) throw new Error("Petition update failed");

        return {
            success: true,
            data: {
                vote: newVote,
                petition: updatedPetition
            }
        }
    }

    async getVotesByPetitionId(id) {
        try {
            const voteList = await votes.find({ petition: id });
            if (!voteList) throw new Error("Error finding votes");
            return {
                success: true,
                data: voteList.length > 0 ? voteList : []
            };
        } catch (error) {
            throw new Error(`Failed to retrieve votes: ${error.message}`);
        }
    }
    
    async deleteVote(voteData) {
        const { user, petition } = voteData;
        let vote = await votes.findOneAndDelete({ user, petition });
        if (!vote) throw new Error("Vote deletion failed");
        let updatedPetition = await Petition.findByIdAndUpdate(petition, { $inc : { votes: -1 } }, { new: true });
        if (!updatedPetition) throw new Error("Petition update failed");

        return {
            success: true,
            data: {
                vote,
                petition: updatedPetition
            }
        }
    }

}
module.exports = VoteService