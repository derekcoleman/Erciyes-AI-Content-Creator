const { dbhelper } = require('../models/database');
const { failure, successfuly } = require('../responses/responses');
const {ai, geminiai} = require('../controllers/ai');
const makejob = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            setInterval(async() => {
            const sql = 'Select * from jobs where day = ? AND hour = ?';
            const createSql = "INSERT INTO posts SET ?";
            const userSql = "SELECT topic FROM settings where user_id = ?";
            const date_time = new Date();
            let hours = date_time.getHours();
            let day = date_time.getDay();
            const makeingjob = await dbhelper(sql,[day,hours]);
            console.log(makeingjob)
            if(makeingjob != ''){
                makeingjob.forEach (async job => {
                    const userId = job.user_id;
                    console.log(userId)
                    const userSettingTopic =await dbhelper(userSql, userId);
                    const aiResponse = await geminiai(userSettingTopic, userId);
                    console.log(aiResponse)
                    //convert
                    const createData = {
                        'user_id':userId,
                        'title': aiResponse['title'],
                        'body': aiResponse['body'],
                        'photos': '',
                    };
                    console.log(createData)
                    const createStatus = dbhelper(createSql, createData);
                });
            }else{
                console.log("There is no job to do!");
            }

        }, 1000*60*60);
        } catch (error) {
            resolve(failure.server_error);
        }
        
    })
}
module.exports = {makejob};