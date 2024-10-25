const { dbhelper } = require('../models/database');
const { failure, successfuly } = require('../responses/responses');
const { encrypt, decrypt } = require('../hash/crptpass');
const {generateRefreshToken} = require('../hash/jsonwebtoken');

const jobs = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            const sql = 'INSERT INTO jobs SET ?';
            const newjob = {
                user_id:req.id,
                platform_id:req.body.platform_id,
                hour:req.body.hour,
                day:req.body.day
            }
            const createNewJob = await dbhelper(sql,newjob);
            if(createNewJob?.protocol41){
                resolve(successfuly.avatar_added)
            }else{
                resolve(failure.server_error);
            }
            resolve(failure.server_error)
        } catch (error) {
            resolve(failure.server_error);
        }
    })
}
const settings = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            const sql = 'INSERT INTO settings SET ?';
            const topic = {
                user_id:req.id,
                topic:req.body.topic,
                language:req.body.language
            }
            const createNewSettings = await dbhelper(sql,topic);
            if(createNewSettings?.protocol41){
                resolve(successfuly.avatar_added)
            }else{
                resolve(failure.server_error);
            }
            resolve(failure.server_error)
        } catch (error) {
            resolve(failure.server_error);
        }
        
    })
}
module.exports = {jobs,settings};