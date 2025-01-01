const express = require('express');
const profileRouter = express.Router();
const {profile, get_profile}  = require('..//controllers/settings');
const {auth} = require('../middlewares/authMiddlewares');


profileRouter.put('/', auth , async (req, res) => {
    const result = await profile(req);
    res.status(result.code).json(result);
})
profileRouter.get('/', auth , async (req, res) => {
    const result = await get_profile(req);
    res.status(result.code).json(result);
})
module.exports = profileRouter;
