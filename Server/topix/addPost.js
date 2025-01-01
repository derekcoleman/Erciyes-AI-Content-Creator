const { createClient } = require("@supabase/supabase-js");
const { dbhelper } = require("../models/database");
const dotenv = require("dotenv");
const { failure, successfuly } = require("../responses/responses");
dotenv.config();

const addPost = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sqlForApiKey = "Select * FROM users where id = ?";
      const sqlforpost = "SELECT * FROM posts where id = ?";
      const topix_api_key = await dbhelper(sqlForApiKey, req.id);
      const post = await dbhelper(sqlforpost, req.body.post_id);
      console.log(topix_api_key);
      console.log(post);
      const post_data = {
        title: post[0].title,
        body: post[0].body,
        post_owner: topix_api_key[0].topix_api_key,
        tags: [],
      };
      const supabase = createClient(
        `${process.env.SUPABASE_LINK}`,
        `${process.env.ANON_KEY}`
      );
      const { data, error } = await supabase.from("posts").insert(post_data);

      const updated_data = await dbhelper(
        "UPDATE posts SET status=1 WHERE id = ?",
        req.body.post_id
      );
      resolve(successfuly.avatar_added);
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
    }
  });
};
const addPostAutomaticly = async (req, res, title, body, topix_api_key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post_data = {
        title: title,
        body: body,
        post_owner: topix_api_key,
        tags: [],
      };
      const supabase = createClient(
        `${process.env.SUPABASE_LINK}`,
        `${process.env.ANON_KEY}`
      );
      const { data, error } = await supabase.from("posts").insert(post_data);

      resolve(successfuly.avatar_added);
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
    }
  });
};
module.exports = { addPost, addPostAutomaticly };
