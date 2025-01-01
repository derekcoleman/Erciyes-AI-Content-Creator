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
            const sql = `
            INSERT INTO settings (
                user_id, topic, language, mood, sub_topic, 
                \`like\`, comment, frequency, interaction
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                topic = VALUES(topic),
                language = VALUES(language),
                mood = VALUES(mood),
                sub_topic = VALUES(sub_topic),
                \`like\` = VALUES(\`like\`),
                comment = VALUES(comment),
                frequency = VALUES(frequency),
                interaction = VALUES(interaction)
        `;
            //         const topic = {
            //     user_id:req.id,
            //     topic:req.body.topic,
            //     language:req.body.language,
            //     mood:req.body.mood,
            //     sub_topic:req.body.sub_topic,
            //     like:req.body.like,
            //     comment:req.body.comment,
            //     frequency:req.body.frequency,
            //     interaction:req.body.interaction
            // }
            const values = [
                req.id,
                req.body.topic,
                req.body.language,
                req.body.mood,
                req.body.sub_topic,
                req.body.like,
                req.body.comment,
                req.body.frequency,
                req.body.interaction,
            ];
            const createNewSettings = await dbhelper(sql,values);
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
const get_settings = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            const sql = 'SELECT * FROM settings WHERE user_id = ?';
            const data = await dbhelper(sql,req.id);
            console.log(data);
            const resolve_data = {
                topic : data[0]?.topic,
                language : data[0]?.language,
                sub_topic : data[0]?.sub_topic,
                mood : data[0]?.mood,
                like : data[0]?.like,
                comment : data[0]?.comment,
                frequency : data[0]?.frequency,
                interaction : data[0]?.interaction,
                message : successfuly.avatar_added.message,
                code : successfuly.avatar_added.code,
                status : successfuly.avatar_added.status
            }
            resolve(resolve_data)
        } catch (error) {
            resolve(failure.server_error);
        }
        
    })
}
const profile = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            const sql = 'UPDATE users SET ? WHERE id = ?';
            const updated_data = {
                topix_api_key : req.body.topix_api_key,
                linkedin_api_key : req.body.linkedin_api_key,
                instagram_api_key : req.body.instagram_api_key
            }
            const createNewusers = await dbhelper(sql,[updated_data, req.id]);
            if(createNewusers?.protocol41){
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
const get_profile = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            const sql = 'SELECT * FROM users WHERE id = ?';
            const data = await dbhelper(sql,req.id);
            const resolve_data = {
                username : data[0]?.username,
                email : data[0]?.email,
                topix_api_key : data[0]?.topix_api_key,
                linkedin_api_key : data[0]?.linkedin_api_key,
                instagram_api_key : data[0]?.instagram_api_key,
                message : successfuly.avatar_added.message,
                code : successfuly.avatar_added.code,
                status : successfuly.avatar_added.status
            }
            resolve(resolve_data)
        } catch (error) {
            console.log(error)
            resolve(failure.server_error);
        }
        
    })
}
const getjob = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            const sql = 'SELECT * FROM jobs WHERE user_id = ?';
            const data = await dbhelper(sql,req.id);
            const resolve_data = {
                data:data,
                message:successfuly.avatar_added.message,
                code:successfuly.avatar_added.code,
                status:successfuly.avatar_added.status
            }
            resolve(resolve_data)
        } catch (error) {
            resolve(failure.server_error);
        }
        
    })
}
module.exports = {jobs,settings,get_settings, profile, get_profile, getjob};