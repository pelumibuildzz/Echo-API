const SolutionService = require("../services/SolutionServices")
const solutionService = new SolutionService()

const isAllowedtomodifySolution = async ( req, res, next) => {
    let userid = req.user.id
    let solutionId = req.params.id
    let solution = await solutionService.getSolutionById(solutionId)
    if (!solution) return res.sendStatus(403)
    if (solution.data.creator == userid) return next()
    res.sendStatus(403)
}

module.exports = { isAllowedtomodifySolution }