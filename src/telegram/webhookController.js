const PetitionService = require('../services/PetitionServices');
const petitionService = new PetitionService();
const VoteService = require('../services/VoteServices');
const voteService = new VoteService();

const updateByWebhookController = async (req, res) => {
    try {
        const update = req.body;

        if (!update.poll) throw new Error("No data to Update")
        const telegramPollId = update.poll.id;
        const pollVoteCount = update.poll.total_voter_count;
        const petition = await petitionService.getPetitionByTelegramPollId(telegramPollId)
        if (!petition) throw new Error("Error Finding petition")
        let voteList = await voteService.getVotesByPetitionId(petition._id)
        let voteCount = voteList.data.length
        petition.votes = voteCount + pollVoteCount;
        await petition.save();
        console.log(`Updated vote count for petition: ${petition._id}`);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error updating vote count:", error);
        return res.status(500);    }

}

module.exports = { updateByWebhookController }