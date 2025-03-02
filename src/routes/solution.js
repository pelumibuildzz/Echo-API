const express = require("express");
const { authenticateUserwebtoken } = require("../middlewares/authenticate");
const { createSolutionController, getSolutionsController, updateSolutionController, deleteSolutionController } = require("../controllers/SolutionController");
const { isAllowedtomodifySolution } = require("../middlewares/solutionpermission");

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.post("/:petitionId", authenticateUserwebtoken, createSolutionController)
router.get("/:petitionId", authenticateUserwebtoken, getSolutionsController)
router.put("/id", authenticateUserwebtoken, isAllowedtomodifySolution, updateSolutionController)
router.delete("/id", authenticateUserwebtoken, isAllowedtomodifySolution, deleteSolutionController)

module.exports = router