const { dbhelper } = require("../models/database");
const { failure, successfuly } = require("../responses/responses");
const { gemini, gemini2 } = require("../controllers/ai");
const { topix } = require("../topix/topix");
const { addPostAutomaticly } = require("../topix/addPost");
const makejob = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      setInterval(async () => {
        const sql = "Select * from jobs where day = ? AND hour = ?";
        const createSql = "INSERT INTO posts SET ?";
        const userSql = "SELECT * FROM settings where user_id = ?";
        const sqlFortopixapikey = "SELECT * FROM users WHERE id = ?";
        const date_time = new Date();
        let hours = date_time.getHours();
        let day = date_time.getDay();
        const makeingjob = await dbhelper(sql, [day, hours]);
        if (makeingjob != "") {
          const user = await dbhelper(sqlFortopixapikey, makeingjob[0].user_id);
          if (user[0].topix_api_key == null) {
            throw new Error("error");
          }
          makeingjob.forEach(async (job) => {
            const userId = job.user_id;
            console.log(userId);
            const prompt = await dbhelper(userSql, userId);
            const returned_data = await topix(
              null,
              null,
              user[0].topix_api_key
            );
            let result;
            if (returned_data.message == "email_not_send") {
              result = await gemini2(
                makeingjob[0].topic,
                makeingjob[0].language,
                makeingjob[0].sub_topic,
                makeingjob[0].mood
              );
            } else {
              let titles = [];
              let length =
                returned_data.topix.length - 1 < 5
                  ? returned_data.topix.length - 1
                  : 5;
              if (returned_data.topix.length - 1 > 0) {
                for (let index = 0; index < length; index++) {
                  titles[index] = returned_data.topix[index].title;
                }
              }
              result = await gemini(
                makeingjob[0].topic,
                makeingjob[0].language,
                makeingjob[0].sub_topic,
                makeingjob[0].mood,
                makeingjob[0].like,
                makeingjob[0].comment,
                makeingjob[0].frequency,
                makeingjob[0].interaction,
                titles,
                returned_data.analysis
              );
            }
            const data = result.response.candidates[0].content.parts[0].text;
            const dataJson = JSON.parse(data);
            const { title, body } = dataJson;
            // const removeEmojis = (text) => text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');

            // const encodedBody = removeEmojis(body);
            // const encodedTitle = removeEmojis(title);

            //convert
            const createData = {
              user_id: userId,
              title: title,
              body: body,
              photos: "",
              status: 1,
            };
            console.log(createData);
            const createTopixPost = addPostAutomaticly(
              null,
              null,
              title,
              body,
              user[0].topix_api_key
            );
            const createStatus = dbhelper(createSql, createData);
          });
        } else {
          console.log("There is no job to do!");
        }
      }, 1000 * 60 * 60);
    } catch (error) {
      resolve(failure.server_error);
    }
  });
};
module.exports = { makejob };
