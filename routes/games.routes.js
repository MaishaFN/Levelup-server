const router = require("express").Router();
const axios = require("axios");

//GET "/list" => All game list
router.get("/list", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}`);
        const response2 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page=2`);
        const response3 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page=2`);
        const response4 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page=2`);
        const response5 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page=2`);

        const list1 = response.data.results;
        const list2 = response2.data.results;
        const list3 = response3.data.results;
        const list4 = response4.data.results;
        const list5 = response5.data.results;

        console.log(response.data.results)
        res.json([...list1, ...list2, ...list3, ...list4, ...list5]);
    } catch (error) {
        next(error)
    }
})

//GET "/:gameId/details" => Game details
router.get("/:gameId/details", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games/${req.params.gameId}?key=${process.env.RAWG_KEY}`);
        res.json(response.data.results);
    } catch (error) {
        next(error)
    }
})

//GET "/find" => find game by query

router.get("/list/:queryValue", async (req, res, next) =>{
    try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}`);
        const queryGames = response.data.results.filter(game => game.name.includes(req.params.queryValue));
        res.json(queryGames);
    } catch (error) {
        next(error)
    }
})


module.exports = router;