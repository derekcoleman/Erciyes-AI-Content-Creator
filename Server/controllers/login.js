const { dbhelper } = require('../models/database');
const { failure, successfuly } = require('../responses/responses');
const { encrypt, decrypt } = require('../hash/crptpass');
const {generateRefreshToken} = require('../hash/jsonwebtoken');
const login = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const sqlForUserName = 'SELECT * FROM users WHERE username = ?';
            const sqlForDevive = `INSERT INTO info SET ?`;
            const device = req?.headers?.device == undefined | null ? "" : req?.headers?.device;
            const ip_address = req?.connection?.remoteAddress == undefined | null ? "" : req?.connection?.remoteAddress;
            const userName = (req.body.username).trim().toLocaleLowerCase('tr-TR');
            const fcm_token = req.body.fcm_token == undefined | null ? "" : req.body.fcm_token;
            const sqlForToken = `INSERT INTO token SET ?`;
            const isUser = await dbhelper(sqlForUserName, userName);
            if ((isUser[0]?.username == undefined)) {
                resolve(failure.user_name_is_not_exist);
                return
            } else if (isUser[0]?.status == 0) {
                resolve(failure.account_is_not_verified);
                return
            } else if (isUser[0]?.password != encrypt(req.body.password)) {
                resolve(failure.wrong_password);
                return
            } else {
                const user = {
                    username: isUser[0].username.toLocaleLowerCase('tr-TR'),
                    id: isUser[0].id
                }
                const token = { token: generateRefreshToken(user) };
                // const info = {
                //     id: uuidv1(),
                //     user_id: isUser[0]?.id,
                //     device: device,
                //     ip_address: ip_address,
                //     fcm_token: fcm_token
                // }
               // console.log(info)
                await dbhelper(sqlForToken, token)
                successfuly.login_successfuly['token'] = token.token
                resolve(successfuly.login_successfuly);
                //await dbhelper(sqlForDevive, info);
                return
            }
        } catch (error) {
            console.log(error)
            resolve(failure.server_error)
            return
        }

    })
}
module.exports = { login };