const { failure } = require("../responses/responses");
const { createClient } = require("@supabase/supabase-js");
const { analysis } = require("../analysis/analysis");
const { ai2 } = require("../controllers/ai");
require("dotenv").config();

const topix = async (req, res, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const supabase = createClient(
        `${process.env.SUPABASE_LINK}`,
        `${process.env.ANON_KEY}`
      );
      const { data, error } = await supabase
        .from("profile_view")
        .select()
        .eq("id", id);
      const allDatas = [];
      if (data == null) {
        resolve(failure.email_not_send);
        return;
      }
      console.log("topix.js data:", data);
      for (i = 0; i < data[0]?.posts.length; i++) {
        allDatas.push({
          title: data[0]?.posts[i].title,
          likeCount: data[0]?.posts[i].reputation,
          commentCount: data[0]?.posts[i].comments,
          viewCount: data[0]?.posts[i].reputation,
        });
      }
      console.log("topix.js allDatas:", allDatas);
      //TOdo: language settingsden çekilecek
      const analysis_result = analysis(allDatas, "tr");
      console.log(allDatas);
      const obje = {
        topix: allDatas,
        analysis: analysis_result,
      };
      resolve(obje);
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
    }
  });
};
module.exports = { topix };
