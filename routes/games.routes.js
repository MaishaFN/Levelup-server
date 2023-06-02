const router = require("express").Router();
const axios = require("axios");


//GET "games/list/:page" => All game list next page
router.get("/list/:page", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page=${req.params.page}`);

        res.json(response.data.results);
    } catch (error) {
        next(error)
    }
})


//GET "/games/:gameId/details" => Game details
router.get("/:gameId/details", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}/${req.params.gameId}`);
        res.json(response.data.results);
    } catch (error) {
        next(error)
    }
})

//GET "/games/find" => find game by query

router.get("/list/:queryValue", async (req, res, next) =>{
    try {
        const game = req.params.queryValue.split(" ").join("-");
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${game}`);
        res.json(response.data.results);
    } catch (error) {
        next(error)
    }
})


module.exports = router;