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
        // const response = await axios.get(`https://api.rawg.io/api/games/${req.params.gameId}?key=${process.env.RAWG_KEY}`);
        const response = await axios.get(`https://api.rawg.io/api/games/${req.params.gameId}?key=${process.env.RAWG_KEY}`);

        res.json(response.data);
    } catch (error) {
        next(error)
    }
})

//GET "/games/:queryValue" => find game by query

router.get("/:queryValue", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${req.params.queryValue}`);
        res.json(response.data.results);
    } catch (error) {
        next(error)
    }
})


module.exports = router;