const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const foodService = require('../services/foodService');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/browse', async (req, res) => {

    try {
        let allMeals = await foodService.getAll(req.query.search);

        if (allMeals.length <= 0) {
            throw new Error("Unable to fetch any recipes!");
        }

        res.json(allMeals);
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }

});


router.get('/myRecipes', isAuth, async (req, res) => {

    try {
        let allMeals = await foodService.getOwn(req.user._id);

        if (allMeals.length <= 0) {
            throw new Error("Unable to fetch any recipes!");

        }
        res.json(allMeals);

    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }

});

module.exports = router;