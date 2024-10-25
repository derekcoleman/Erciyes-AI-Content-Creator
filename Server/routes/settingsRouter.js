const express = require('express');
const settingsRouter = express.Router();
const {jobs, settings}  = require('..//controllers/settings');
const {auth} = require('../middlewares/authMiddlewares');


settingsRouter.post('/', auth , async (req, res) => {
    const result = await jobs(req);
    res.status(result.code).json(result);
})
settingsRouter.post('/topic', auth , async (req, res) => {
    const result = await settings(req);
    res.status(result.code).json(result);
})
module.exports = settingsRouter;
