const VoteService = require('../services/VoteServices');
const voteService = new VoteService();

const createVoteController = async (req, res) => {
    try {
        let { userid } = req.body
        let petitionid = req.params.petitionId;
        if ( !userid || !petitionid ) throw new Error("All fields are required");
        let data = { user: userid, petition: petitionid };
        let newVote = await voteService.createVote(data);
        if (!newVote.success) throw new Error("Vote failed");
        res.status(200).json({
            success: true,
            data: create.data
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const deleteVoteController = async (req, res) => {
    try {
        let { userid } = req.body
        let petitionid = req.params.petitionId;
        if ( !userid || !petitionid ) throw new Error("All fields are required");
        let data = { user: userid, petition: petitionid };
        let deleteVote = await voteService.deleteVote(data);
        if (!deleteVote.success) throw new Error("Vote deletion failed");
        res.status(200).json({
            success: true,
            data: deleteVote.data
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = { createVoteController, deleteVoteController };