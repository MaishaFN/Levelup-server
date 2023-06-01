const router = require("express").Router();
const axios = require("axios");

//GET "/list" => All game list
router.get("/list", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}`);
        console.log(response.data.results.length)
        res.json(response.data.result);
    } catch (error) {
        next(error)
    }
})

//GET "/:gameId/details" => Game details
router.get("/:gameId/details", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${req.params.gameId}?key=${process.env.RAWG_KEY}`);
        res.json(response.data);
    } catch (error) {
        next(error)
    }
})

//GET "/find" => find game by query

router.get("/list/:queryValue", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}`);
        const queryGames = response.data.filter(game => game.title.includes(req.params.queryValue));
        res.json(queryGames);
    } catch (error) {
        next(error)
    }
})


module.exports = router;