const { get } = require("mongoose");
const SolutionService =  require("../services/SolutionServices");
const solutionService = new SolutionService();

const createSolutionController = async ( req, res ) => {
    try {
        let petition = req.params.petitionId
        let creator = req.user.id
        let { title, description } = req.body
        if (!petition || !title || !description) throw new Error("All Fields are Required")
        let data = { petition, creator, title, description }
        let newSolution = await solutionService.createSolution(data)
        if (!newSolution) throw new Error("Error Creating Solution")
        res.status(200).json({
            success: true,
            data: newSolution.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const getSolutionsController = async ( req, res ) => {
    try {
        let petition = req.params.petitionId
        let creator = req.user.id
        if ( petition ) {
            let data = petition
            let solutions = await solutionService.getSolution(data)
            res.status(200).json({
                success: true,
                data: solutions.data
            })
        }else{
            let data = creator
            let solutions = await solutionService.getSolution(data)
            res.status(200).json({
                success: true,
                data: solutions.data
            })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const updateSolutionController = async ( req, res ) => {
    try {
        let id = req.params.solutionId
        if (!id) throw new Error("No Id to Update")
        let { title, description } = req.body
        if ( !title || !description ) throw new Error("No data to Update")
        let data = { title, description }
        let updatedSolution = await solutionService.updateSolution(id, data)
        if (!updatedSolution) throw new Error("Error updating Solution")
        res.status(200).json({
            success: true,
            data: updatedSolution.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const deleteSolutionController = async ( req, res) => {
    try {
        let id = req.params.id
        let solution = await solutionService.deleteSolution(id)
        if (!solution) throw new Error("Error Deleting Solution")
        res.status(200).json({
            success: true,
            data: solution.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = { createSolutionController, getSolutionsController, updateSolutionController, deleteSolutionController }