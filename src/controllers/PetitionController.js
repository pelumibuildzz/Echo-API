const PetitionService = require('../services/PetitionServices');
const petitionService = new PetitionService();

const createPetitionController = async (req, res) => {
    try {
        let { title, category, description } = req.body
        let createdBy = req.user.id;
        if (!title || !category || !description ) throw new Error("All fields are required");
        let data = { title, category, createdBy };
        let createPetition = await petitionService.createPetition(data);
        if (!createPetition.success) throw new Error("Petition creation failed");
        res.status(200).json({
            success: true,
            data: createPetition.data
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const getPetitionsController = async (req, res) => {
    try {
        let id = req.params.id
        if ( id ) {
            let petition = await petitionService.getPetitionById(id);
            if (!petition) throw new Error("Petition not found");
            return res.status(200).json({
                success: true,
                data: petition.data
            });
        }
        let { category, status } = req.query;
        let petitions = await petitionService.getPetitions({ category, status });
        if (!petitions.success) throw new Error("No petitions found");
        res.status(200).json({
            success: true,
            data: petitions.data
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

const getUserPetitionsController = async ( req, res ) => {
    try {
        let user = req.user
        if (!user) throw new Error("Sign in User First")
        let petitions = await petitionService.getPetitions({ creator: user.id})
        res.status(200).json({
            success: true,
            data: petitions.data
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }    
}

const deletePetitionController = async (req, res) => {
    try {
        let id = req.params.id
        let petition = await petitionService.deletePetition(id);
        if (!petition.success) throw new Error("Petition deletion failed");
        res.status(200).json({
            success: true,
            message: petition.message
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
}

module.exports = { createPetitionController, getPetitionsController, deletePetitionController, getUserPetitionsController };