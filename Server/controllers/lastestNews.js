const fetch = require('node-fetch');
const { failure } = require("../responses/responses");

const latestNews = async (req, res, language) => {
    return new Promise(async (resolve) => {
        try {
            if(language == 'türkçe'){
                language = 'tr'
            }else if(language == 'english'){
                language = 'en'
            }
            const API_KEY = `YZ8Ok0OkGq1W8zG8cuNrNMKK4CWfEo_QBJzcQI8S2xcjJnbP`
                    const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}&language=${language}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    let title = [];
                    let i;
                    for(i=0;i<5;i++){
                        title.push({title:data.news[i].title,body:data.news[i].description})
                    }
                    console.log(title)
            resolve(title)

        } catch (error) {
            console.log(error)
            resolve(failure.server_error)
            return
        }

    })
}
module.exports= {latestNews};