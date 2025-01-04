const { failure, successfuly } = require("../responses/responses");
const { dbhelper } = require("../models/database");
const { createClient } = require("@supabase/supabase-js");
const { analysis } = require("../analysis/analysis");
require("dotenv").config();

const statistics = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const sql = "select * from users where id = ?";
      const user = await dbhelper(sql, req.id);
      if (user[0].topix_api_key == null) {
        resolve(failure.no_topix_api_key);
        return;
      }
      const supabase = createClient(
        `${process.env.SUPABASE_LINK}`,
        `${process.env.ANON_KEY}`
      );
      const { data, error } = await supabase
        .from("profile_view_interaction")
        .select()
        .eq("id", user[0].topix_api_key);
      //console.log(data[0].posts);

      const allDatas = [];
      if (data == null) {
        resolve(failure.no_topix_data);
        return;
      }
      const bedi = await supabase
        .from("user_ibo")
        .select()
        .eq("post_owner_id", user[0].topix_api_key);
      const commentsSupabase = await supabase
        .from("comment_levo")
        .select()
        .eq("post_owner", user[0].topix_api_key);
      //  const now = new Date();
      //  const oneDayAgo = new Date();
      const newlist = [];
      const commentList = [];
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      // Bugünün tarihini al
      const now = new Date();

      for (let i = 0; i < 15; i++) {
        let currentDate = new Date(now);

        currentDate.setDate(now.getDate() - i);

        const filteredData = bedi.data.map((item) => {
          const createdAt = formatDate(item.created_at);
          return createdAt === formatDate(currentDate.toISOString())
            ? createdAt
            : undefined;
        });
        const filteredCommentData = commentsSupabase.data.map((item) => {
          const createdAt = formatDate(item.created_at);
          return createdAt === formatDate(currentDate.toISOString())
            ? createdAt
            : undefined;
        });
        commentList.push({
          [formatDate(currentDate.toISOString())]: filteredCommentData.filter(
            (item) => item !== undefined
          ).length,
        });
        newlist.push({
          [formatDate(currentDate.toISOString())]: filteredData.filter(
            (item) => item !== undefined
          ).length,
        });
      }

      for (i = 0; i < data[0]?.posts.length; i++) {
        allDatas.push({
          title: data[0]?.posts[i].title,
          body: data[0]?.posts[i].title,
          likeCounts: data[0]?.posts[i].reputation,
          commentCounts: data[0]?.posts[i].comments,
          viewCounts: data[0]?.posts[i].interaction,
        });
      }
      const total = [];
      let totalLikeCount = 0;
      let totalCommentCount = 0;
      let totalViewCount = 0;
      let totalPostCount = 0;
      for (i = 0; i < data[0]?.posts.length; i++) {
        totalLikeCount += data[0]?.posts[i].reputation;
        totalCommentCount += data[0]?.posts[i].comments;
        totalViewCount += data[0]?.posts[i].interaction;
        totalPostCount++;
      }
      total.push({
        totalLikeCount: totalLikeCount,
        totalCommentCount: totalCommentCount,
        totalViewCount: totalViewCount,
        totalPostCount: totalPostCount,
      });

      const analysis_result = analysis(allDatas, "tr");

      const obje = {
        topix: allDatas,
        analysis: analysis_result,
      };
      const resolve_data = {
        totalcommentcountbydaylist: commentList,
        totallikecountbydaylist: newlist,
        data: analysis_result,
        total: total,
        message: successfuly.avatar_added.message,
        code: successfuly.avatar_added.code,
        status: successfuly.avatar_added.status,
      };
      resolve(resolve_data);
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
    }
  });
};
module.exports = { statistics };
