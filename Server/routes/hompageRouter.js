const express = require('express');
const homepageRouter = express.Router();
const {auth} = require('../middlewares/authMiddlewares');
const {gethomepage} = require('../controllers/homePage');


homepageRouter.get('/', auth , async (req, res) => {
    const result = await gethomepage(req);
    res.status(result.code).json(result);
})
// aiRouter.get('/gemini', auth , async (req, res) => {
//     const result = await gemini(req);
//     console.log(result);
//     res.status(result.code).json(result);
// })
module.exports = homepageRouter;
