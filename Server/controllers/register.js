const { dbhelper } = require('../models/database');
const { failure, successfuly } = require('../responses/responses');
const { encrypt, decrypt } = require('../hash/crptpass');


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function cleanAndValidate(input) {
    const trimmedInput = input.trim();
    const allowedCharactersRegex = /^[a-z0-9_.ğüşıöçĞÜŞİÖÇ]+$/i;
    return allowedCharactersRegex.test(trimmedInput);
}
const create_newUser = async (req, res) => {
    return new Promise(async resolve => {
        try {
            const userName = req.body.username;
            userName.toLocaleLowerCase('tr-TR')
            const email = req.body.email;
            const sqlForEmail = 'SELECT * FROM users WHERE email = ?';
            const sqlForUserName = 'SELECT * FROM users WHERE username = ?';
            const sqlForRegister = `INSERT INTO users SET ?`;
            const already_registred = await dbhelper(sqlForEmail, email);
            const userName_alreadyHave = await dbhelper(sqlForUserName, userName);
            if ((already_registred[0]?.username.length > 0)) {
                resolve(failure.already_exist);
            } else if (!cleanAndValidate(userName)) {
                resolve(failure.wrong_character)
            } else if (userName_alreadyHave[0]?.username.length > 0) {
                resolve(failure.user_name_already_exist);
            } else if (userName.length <= 4) {
                resolve(failure.user_name_to_short);
            } else if (!(req.body.password.length >= 8)) {
                resolve(failure.password_must_be_greater_than_eight_characters);
            } else if (validateEmail(email) == null) {
                resolve(failure.wrong_email);
            } else {
                const newUser = {
                    username: userName.toLocaleLowerCase('tr-TR'),
                    email: req.body.email,
                    password: encrypt(req.body.password),
                    status: true,
                }
                const registered = await dbhelper(sqlForRegister, newUser);
                if (registered?.protocol41) {
                    resolve(successfuly.register_added);
                }
                resolve(failure.Your_new_password_cannot_be_the_same_as_your_old_password);
            }
        } catch (error) {
            resolve(error);
            return
        }
    })
}
module.exports = { create_newUser };
