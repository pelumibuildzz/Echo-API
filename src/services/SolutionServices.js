const Solution = require("../models/solution");

class SolutionService {

    async createSolution(data) {
        const { petition, creator, title, description } = data
        const newSolution = new Solution({
            petition,
            creator,
            title,
            description
        })
        await newSolution.save()
        if (!newSolution) throw new Error("Solution creation Failed")
        return{
            success: true,
            data: newSolution
        }
    }

    async getSolutionById(id){
        let solution = Solution.findById(id)
        if (!solution) throw new Error("No Solution Found")
        return{
            success: true,
            data: solution
        }
    }

    async getSolution(data) {
        const { petition, creator } = data
        let searchData = { petition, creator }
        const solutions = await Solution.find({ searchData })
        if (!solutions) throw new Error("Solution not Found")
        return{
            success: true,
            data: solutions
        }
    }

    async updateSolution(id, data) {
        let { title, description } = data ;
        let updateData = {}
        if ( title ) updateData[title] = title
        if ( description ) updateData[description] = title
        if (!updateData) throw new Error("No Data to Update")
        const updatedSolution = await Solution.findByIdAndUpdate(
            id,
            { updateData },
            { new: true }
        )
        if (!updatedSolution) throw new Error("Error Updating Solution")
        return {
            success: true,
            data: updatedSolution
        }
    }

    async deleteSolution(id) {
        const deletedSolution = await Solution.findByIdAndDelete(id);
        if (!deletedSolution) throw new Error("Solution deletion failed");
        return {
            success: true,
            data: deletedSolution
        }
    }

}

module.exports = SolutionService