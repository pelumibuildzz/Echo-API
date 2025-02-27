const MergedPetitionService = require('../services/MergedServices');
const mergedPetitionService = new MergedPetitionService();
const PetitionService = require('../services/PetitionServices');
const petitionService = new PetitionService();


const createMergedPetitionController = async (req, res) => {
    try {
        let { petitions } = req.body
        let createdBy = req.user.id;
        if (!petitions || !createdBy ) throw new Error("All fields are required");
        let data = { petitions, createdBy };
        let mergedPetition = mergedPetitionService.createMergedPetition(data)
        if (!mergedPetition) throw new Error("Error Merging Petitions")
        res.status(200).json({
            success: true,
            data: mergedPetition.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const getAllPetitionsController = async (req, res) => {
    try {
        let petitions = await petitionService.getPetitions();
        let mergedPetitions = await mergedPetitionService.getMergedPetitions();
        if (!petitions.success || !mergedPetitions.success) throw new Error("No petitions found");
        let mergedPetitionData = []
        mergedPetitions.data.forEach(async mergedPetition => {
            let petitionsData = await mergedPetitionService.getPetitionfromMerge(mergedPetition._id)
            if (!petitionsData) throw new Error("Error Getting Merged Petitions")
            mergedPetitionData.push( petitionsData )
        })
        let allPetitions = [...petitions.data, ...mergedPetitionData]
        res.status(200).json({
            success: true,
            data: allPetitions
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const updatePetitionController = async (req, res) => {
    try {
        let { petitions, status } = req.body
        let id = req.params.id;
        if ( !petitions || !status ) throw new Error("No Data To Update")
        let petition = await petitionService.getPetitionById(id)
        let merged = await mergedPetitionService.getMergedPetitionById(id)
        if (merged.success) {
            let data = { petitions, status}
            let updatedMergedPetition = await mergedPetitionService.updateMerge( id, data )
            if (!updatedMergedPetition) throw new Error("Error Updating Merged Petition")
            res.status(200).json({
                success: true,
                data: updatedMergedPetition.data
            })
        }else if(petition.success){
            let data = { status }
            let updatedPetition = await petitionService.updatePetition(id, data)
            if (!updatedPetition) throw new Error("Error Updating Petition")
            res.status(200).json({
                success: true,
                data: updatedPetition.data
            })
        }else{
            throw new Error("Invalid Petition or Merged Petition NotFound")
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = { createMergedPetitionController, getAllPetitionsController, updatePetitionController }