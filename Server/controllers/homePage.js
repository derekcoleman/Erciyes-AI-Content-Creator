const {dbhelper} = require('../models/database');
const {successfuly, failure} = require('../responses/responses')
const gethomepage = async (req, res) => {
    return new Promise(async resolve => {
        try {
            const sql = "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC";
            const data = await dbhelper(sql,req.id);
            const resolve_data = {
                posts: data,
                message: successfuly.avatar_added.message,
                status: successfuly.avatar_added.status,
                code: successfuly.avatar_added.code
            }
            resolve(resolve_data);

        } catch (error) {
            console.log(error)
            resolve(failure.server_error);
        }}
    )}
    module.exports = {gethomepage};