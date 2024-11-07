const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const settingsRouter = require('./routes/settingsRouter');
const aiRouter = require('./routes/aiRouter');
const {makejob} = require('./controllers/makejob');

dotenv.config();
app.use(cors());
app.use(express.json());
app.get('/', (req,res) =>{
    res.json({message:"hello"})
})

app.use('/api/register',registerRouter);
app.use('/api/login',loginRouter);
app.use('/api/settings',settingsRouter);
app.use('/api/ai',aiRouter);


makejob();
const PORT = process.env.PORT || 8088;

app.listen(PORT, ()=> {
    console.log(`server is running on port : ${PORT}`);
})