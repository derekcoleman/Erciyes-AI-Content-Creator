const { failure, successfuly } = require("../responses/responses");
const{ dbhelper} = require("../models/database");
const { createClient } = require("@supabase/supabase-js");
const { analysis } = require("../analysis/analysis");
require("dotenv").config();


const statistics = async (req,res) => {
    return new Promise(async(resolve) => {
        try {
            const sql = 'select * from users where id = ?'
            const user = await dbhelper(sql, req.id);
            if(user[0].topix_api_key == null){
                resolve(failure.no_topix_api_key)
                return;
            }
            const supabase = createClient(
              `${process.env.SUPABASE_LINK}`,
              `${process.env.ANON_KEY}`
            );
            const { data, error } = await supabase
              .from("profile_view")
              .select()
              .eq("id", user[0].topix_api_key);
            const allDatas = [];
            if (data == null) {
              resolve(failure.no_topix_data);
              return;
            }
            for (i = 0; i < data[0]?.posts.length; i++) {
              allDatas.push({
                title: data[0]?.posts[i].title,
                likeCount: data[0]?.posts[i].reputation,
                commentCount: data[0]?.posts[i].comments,
                viewCount: data[0]?.posts[i].reputation,
              });
            }
            //TOdo: language settingsden çekilecek
            const analysis_result = analysis(allDatas, "tr");
            console.log(allDatas);
            const obje = {
              topix: allDatas,
              analysis: analysis_result,
            };
            const resolve_data = {
                data:analysis_result,
                message:successfuly.avatar_added.message,
                code:successfuly.avatar_added.code,
                status:successfuly.avatar_added.status
            }
            resolve(resolve_data);
        } catch (error) {
            console.log(error)
            resolve(failure.server_error);
        }
    })
}
module.exports = {statistics}