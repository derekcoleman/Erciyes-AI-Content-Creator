const { failure, successfuly } = require("../responses/responses");
const { dbhelper } = require("../models/database");

const editpost = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const sql = "update posts SET ? where id = ? ";
      const updatedData = {
        title: req.body.title,
        body: req.body.body,
      };
      const update = await dbhelper(sql, [updatedData, req.body.id]);
      if (update?.protocol41) {
        resolve(successfuly.avatar_added);
      } else {
        resolve(failure.server_error);
      }
      resolve(failure.server_error);
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
    }
  });
};
const deletePost = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const sql = "delete from posts where id = ? and status = 0";

      const deletePost = await dbhelper(sql, req.body.id);

      if (deletePost?.protocol41) {
        resolve(successfuly.avatar_added);
      } else {
        resolve(failure.server_error);
      }
      resolve(failure.server_error);
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
    }
  });
};
module.exports = { editpost, deletePost };
