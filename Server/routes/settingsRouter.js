const express = require('express');
const settingsRouter = express.Router();
const {jobs, settings, get_settings, getjob}  = require('..//controllers/settings');
const {auth} = require('../middlewares/authMiddlewares');


settingsRouter.post('/', auth , async (req, res) => {
    const result = await jobs(req);
    res.status(result.code).json(result);
})
settingsRouter.get('/getjob', auth , async (req, res) => {
    const result = await getjob(req);
    res.status(result.code).json(result);
})
settingsRouter.get('/', auth , async (req, res) => {
    const result = await get_settings(req);
    res.status(result.code).json(result);
})
settingsRouter.post('/topic', auth , async (req, res) => {
    const result = await settings(req);
    res.status(result.code).json(result);
})
module.exports = settingsRouter;
