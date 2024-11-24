const openai = require("openai");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const {failure,successfuly} = require('../responses/responses');
const { dbhelper } = require("../models/database");

const client = new openai({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });
  
  async function chatgptai() {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });
  }

//   const si = `You are a social media content creator. You should create contents about given idea and consider the past contents if it exist. Your return format like Title and body. Return long contents. Do not mark up your texts`;
    const si = `
    You are a social media content creator. You should create contents about given idea and consider the past contents if it exist.
    Your response must be a JSON object. Content object has the following schema:

* title: Title of the content
* body: body of the contet`;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash',
	systemInstruction: {
		parts: [{ text:si }],
		role:"model"
	} } , { apiVersion:'v1beta' });

    async function gemini(prompt, language, lastTitles) {
        // console.log("---------------------------------------------LASTTITLES", lastTitles);
        let text;
        console.log(lastTitles);
        if(lastTitles != ''){
            text = `
                Give me content about "${prompt}". Please response me in this JSON schema: title:'', body:'' and in ${language} language. 
                These are the content titles you generated before:
                ${lastTitles}`
                }else {
                    console.log("-----------------------------------------------------------------------------------------------------------");
                    text = `
                Give me content about "${prompt}". Please response me in this JSON schema: title:'', body:'' and in ${language} language.`
                }

                
        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
            response_mime_type:'application/json'
        };
    
        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,	threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
        ];

        const parts = [
            {text},
          ];
    
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });
    
        try {
    
            if(result.response.promptFeedback && result.response.promptFeedback.blockReason) {
    
                return { error: `Blocked for ${result.response.promptFeedback.blockReason}` };
            }
            const response = result.response;
            return { response };
        } catch(e) {
    
            return {
                error:e.message
            }
        }


    }

  const ai = async (req, res) => {
    return new Promise(async (resolve) => {
        try {
            const sqlforpost = 'insert into posts SET ?'
            const sql = 'select title from posts where user_id = ? order by created_at desc limit 5';
            const sqlforprompt = 'select topic, language from settings where user_id = ?'
            const prompt = await dbhelper(sqlforprompt,req.id);
            const postitles = await dbhelper(sql,req.id);
            
            let titles = [];
            let length = postitles.length < 5 ? postitles.length : 5;
            if(postitles.length > 0){
                for (let index = 0; index < length; index++) {
                    console.log(postitles[0].title);
                    titles[index] = postitles[index].title;
                }
            }
            
             const result = await gemini(prompt[0].topic, prompt[0].language, titles);
             console.log(result.response.candidates[0].content.parts[0].text)
             const data = result.response.candidates[0].content.parts[0].text;
             const dataJson = JSON.parse(data);
             const {title,body}=dataJson
            
            const createdpost = {
                user_id:req.id,
                title:title,
                body:body
            }
            const createpost = await dbhelper(sqlforpost,createdpost);
            let message;
            if(createpost.protocol41==true){
                 message = {
                    code:successfuly.hompage_showed.code,
                    message:successfuly.hompage_showed.message,
                    status:successfuly.hompage_showed.status,
                    post:createdpost
                }
            }else{
                 message = {
                    code:failure.server_error.code,
                    message:failure.server_error.message,
                    status:failure.server_error.status,
                }
            }
            resolve(message);
                return
        } catch (error) {
            console.log(error)
            resolve(failure.server_error)
            return
        }

    })
}
const geminiai  = async (prompt, id) => {
    return new Promise(async (resolve) => {
        try {
            console.log(`-----------------------------------------------${id}`)
            const sql = 'select title from posts where user_id = ? order by created_at desc limit 5';
            const postitles = await dbhelper(sql, id);
            const result = await gemini(prompt,postitles);
                return result
        } catch (error) {
            console.log(error)
            resolve(failure.server_error)
            return
        }

    })
}

module.exports ={ai, geminiai}