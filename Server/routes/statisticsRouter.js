const express = require('express');
const statisticsRouter = express.Router();
const {auth} = require('../middlewares/authMiddlewares');
const {statistics}  = require('..//controllers/statistics');
statisticsRouter.get('/', auth, async (req, res) => {
    const result = await statistics(req);
     res.status(result.code).json(result);
})
module.exports = statisticsRouter;
