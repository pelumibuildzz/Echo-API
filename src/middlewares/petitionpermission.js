const PetitionService =  require("../services/PetitionServices")
const petitionService = new PetitionService()

const isAllowed = async (req, res, next) => {
    let userid = req.user.id
    let role = req.user.role
    if (role == "council") return next()
    let petitionid = req.params.id
    let petition = await petitionService.getPetitionById(petitionid)
    if (petition.data.createdBy == userid) return next()
    res.sendStatus(403)
}

module.exports = { isAllowed }