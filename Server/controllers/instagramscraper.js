const { failure } = require("../responses/responses")
const fetch = require('node-fetch');
const { analysis } = require('../analysis/analysis');
const  {HttpsProxyAgent} = require ( 'https-proxy-agent' ); 
const proxyAgent = new HttpsProxyAgent ( 'http://64.137.42.112:5157' );

const instagram = async (req, res, username) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(username)
            //const username = "ibrahim.buruu"
            const response = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
                "agent":proxyAgent,
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
                    "cookie": `datr=w1ZPZw2-1yLS1hFIwRK5yFRl; ig_did=E8D7EC05-08B6-4FD2-9F39-EE01D095A530; mid=Z09WwwAEAAFlb7qOnaUoBLd1HYHt; ig_nrcb=1; csrftoken=y1ROspYYEWVuHzCoCIl41aqVlAFh3FUR; ds_user_id=70930930531; sessionid=70930930531%3ANoIg1EcrzOlDmj%3A21%3AAYdNbM0FI-I5xi38mKf0KFywbuNRjrr6xvv0igaMSQ; wd=916x1003; rur="LDC\/05470930930531\/0541764789144:01f7582a787a8f2401e90e7186853cd4980464ff7845ee241fe58b9561aace6da25ad0c4"`,
                    "Referer": `https://www.instagram.com/${username}/`,
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": null,
                "method": "GET"
            });
            console.log(response)

            const json = await response.json();
            const stringfy = JSON.stringify(json);
            const postDatas = (json.data.user.edge_owner_to_timeline_media.edges);
            console.log(stringfy)

            const allDatas = [];
            for (i = 0; i < postDatas.length; i++) {
                allDatas.push({
                    title: postDatas[i].node.edge_media_to_caption.edges[0].node.text,
                    likeCount: postDatas[i].node.edge_liked_by.count,
                    commentCount: postDatas[i].node.edge_media_to_comment.count,
                    viewCount: postDatas[i].node.video_view_count
                })
            }

            //  console.log(allDatas[0])
            const analysisResult = analysis(allDatas, "tr");
            resolve(analysisResult);

        } catch (error) {
            console.log("sdgggggggsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
            console.log(error)
            resolve(failure.server_error);
        }
    })
}
module.exports = { instagram }