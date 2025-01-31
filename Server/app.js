const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const settingsRouter = require('./routes/settingsRouter');
const aiRouter = require('./routes/aiRouter');
const profileRouter = require('./routes/profileRouter')
const homepageRouter = require('./routes/hompageRouter')
const topixRouter = require('./routes/topixRouter')
const postRouter = require('./routes/postRouter')
const statisticsRouter = require('./routes/statisticsRouter');
// const {latestNews} = require('./controllers/lastestNews')
// latestNews();
const {makejob} = require('./controllers/makejob');
const { topix } = require('./topix/topix');
//topix(null, null,'atQs')
dotenv.config();
app.use(cors());
app.use(express.json());
app.get('/', (req,res) =>{
    res.json({DESIGNED_BY:"BURU"})
})
app.use('/api/homepage',homepageRouter);
app.use('/api/register',registerRouter);
app.use('/api/login',loginRouter);
app.use('/api/settings',settingsRouter);
app.use('/api/ai',aiRouter)
app.use('/api/profile',profileRouter);
app.use('/api/topix',topixRouter);
app.use('/api/post',postRouter);
app.use('/api/statistics',statisticsRouter);

//makejob();
const PORT = process.env.PORT || 8088;

app.listen(PORT, ()=> {
    console.log(`server is running on port : ${PORT}`);
})