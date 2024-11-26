const { failure } = require("../responses/responses")
const fetch = require('node-fetch');
const { analysis } = require('../analysis/analysis');

const instagram = async (req, res, username) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(username)
            //const username = "ibrahim.buruu"
            const response = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
                    "accept": "*/*",
                    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
                    "priority": "u=1, i",
                    "sec-ch-prefers-color-scheme": "dark",
                    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                    "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"131.0.6778.70\", \"Chromium\";v=\"131.0.6778.70\", \"Not_A Brand\";v=\"24.0.0.0\"",
                    "sec-ch-ua-mobile": "?1",
                    "sec-ch-ua-model": "\"Nexus 5\"",
                    "sec-ch-ua-platform": "\"Android\"",
                    "sec-ch-ua-platform-version": "\"6.0\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-asbd-id": "129477",
                    "x-csrftoken": "cMXrZaGnJHRp5cVWHD7tk0LaAoI5FZSo",
                    "x-ig-app-id": "1217981644879628",
                    "x-ig-www-claim": "0",
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": "datr=13dwZQDbF2n94ZV0xe7LFm1o; ig_nrcb=1; ig_did=C763BBF5-4F56-42D8-AFE3-45422E27AE83; ps_n=1; ps_l=1; mid=ZtL23QALAAEfwpti3Rm7dg79DN-U; csrftoken=cMXrZaGnJHRp5cVWHD7tk0LaAoI5FZSo; wd=618x824; dpr=2",
                    "Referer": `https://www.instagram.com/${username}/`,
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": null,
                "method": "GET"
            });
            console.log(response.status)

            const json = await response.json();
            const postDatas = (json.data.user.edge_owner_to_timeline_media.edges);

            const allDatas = [];
            for (i = 0; i < postDatas.length; i++) {
                allDatas.push({
                    title: postDatas[i].node.edge_media_to_caption.edges[0].node.text,
                    likeCount: postDatas[i].node.edge_liked_by.count,
                    commentCount: postDatas[i].node.edge_media_to_comment.count,
                    viewCount: postDatas[i].node.video_view_count
                })
            }

            //console.log(allDatas[0])
            const analysisResult = analysis(allDatas, "tr");
            resolve(analysisResult);

        } catch (error) {
            resolve(failure.server_error);
        }
    })
}
module.exports = { instagram }