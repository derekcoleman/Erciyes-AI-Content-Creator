const express = require('express');
const aiRouter = express.Router();
const {auth} = require('../middlewares/authMiddlewares');
const {ai} = require('../controllers/ai');


aiRouter.get('/', auth , async (req, res) => {
    const result = await ai(req);
    res.status(result.code).json(result);
})
// aiRouter.get('/gemini', auth , async (req, res) => {
//     const result = await gemini(req);
//     console.log(result);
//     res.status(result.code).json(result);
// })
module.exports = aiRouter;
