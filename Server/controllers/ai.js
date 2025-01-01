const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { failure, successfuly } = require("../responses/responses");
const { dbhelper } = require("../models/database");
const { instagram } = require("./instagramscraper");
const { topix } = require("../topix/topix");
//   const si = `You are a social media content creator. You should create contents about given idea and consider the past contents if it exist. Your return format like Title and body. Return long contents. Do not mark up your texts`;
const si = `
    You are a social media content creator. You should create contents about given idea and consider the past contents if it exist.
    Your response must be a JSON object. Content object has the following schema:

* title: Title of the content
* body: body of the contet`;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  {
    model: "gemini-1.5-flash",
    systemInstruction: {
      parts: [{ text: si }],
      role: "model",
    },
  },
  { apiVersion: "v1beta" }
);

async function gemini(
  prompt,
  language,
  sub_topic,
  mood,
  like,
  comment,
  frequency,
  interaction,
  lastTitles,
  topix_data
) {
  // console.log("---------------------------------------------LASTTITLES", lastTitles);
  let text = `Give me content about "${prompt}". Please response me in this JSON schema: title:'', body:'' and in ${language} language.`;
  let chosies;
  console.log(lastTitles);
  chosies += like ? "mostLikedPost, " : "";
  chosies += comment ? "mostCommentedPost, " : "";
  chosies += frequency ? "sortedWordCounts, " : "";
  chosies += interaction ? "mostViewedPost" : "";

  text +=
    lastTitles != ""
      ? `These are the content titles you generated before: [${lastTitles}]`
      : ``;
  // These are the contents most liked, most commented, most viewed, highest like engagement, highest comment engagement objects:
  // ${JSON.stringify(topix_data)} mostly take into consideration ${chosies}

  text += mood != null ? `write in ${mood} mood\n` : "";
  text += sub_topic != null ? `as a subtopic about ${sub_topic}` : "";
  console.log(text);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    response_mime_type: "application/json",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [{ text }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  try {
    if (
      result.response.promptFeedback &&
      result.response.promptFeedback.blockReason
    ) {
      return {
        error: `Blocked for ${result.response.promptFeedback.blockReason}`,
      };
    }
    const response = result.response;
    return { response };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}
async function gemini2(topic, language, sub_topic, mood) {
  // console.log("---------------------------------------------LASTTITLES", lastTitles);
  let text = `Give me content about "${topic}". Please response me in this JSON schema: title:'', body:'' and in ${language} language.`;
  text += mood != null ? `write in ${mood} mood\n` : "";
  text += sub_topic != null ? `as a subtopic about ${sub_topic}` : "";
  console.log(text);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    response_mime_type: "application/json",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [{ text }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  try {
    if (
      result.response.promptFeedback &&
      result.response.promptFeedback.blockReason
    ) {
      return {
        error: `Blocked for ${result.response.promptFeedback.blockReason}`,
      };
    }
    const response = result.response;
    return { response };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}

const ai = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const sqlforpost = "insert into posts SET ?";
      const sqlforprompt = "select * from settings where user_id = ?";
      const sqlfortopixapikey = "select * from users where id = ?";
      const user = await dbhelper(sqlfortopixapikey, req.id);
      const prompt = await dbhelper(sqlforprompt, req.id);
      const returned_data = await topix(null, null, user[0].topix_api_key);
      if (returned_data.message == "email_not_send") {
        const result = await ai2(req);
        resolve(result);
        return;
      }
      console.log(returned_data);
      let titles = [];
      console.log("ddddddddddddddddddddddddddddddd");
      console.log(returned_data.topix.length);

      let length =
        returned_data.topix.length - 1 < 5 ? returned_data.topix.length - 1 : 5;
      if (returned_data.topix.length - 1 > 0) {
        for (let index = 0; index < length; index++) {
          titles[index] = returned_data.topix[index].title;
        }
      }
      const result = await gemini(
        prompt[0].topic,
        prompt[0].language,
        prompt[0].sub_topic,
        prompt[0].mood,
        prompt[0].like,
        prompt[0].comment,
        prompt[0].frequency,
        prompt[0].interaction,
        titles,
        returned_data.analysis
      );
      const data = result.response.candidates[0].content.parts[0].text;
      const dataJson = JSON.parse(data);
      const { title, body } = dataJson;
      console.log(body);
      const removeEmojis = (text) =>
        text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");

      const encodedBody = removeEmojis(body);
      const encodedTitle = removeEmojis(title);

      const createdpost = {
        user_id: req.id,
        title: encodedTitle,
        body: encodedBody,
      };
      const createpost = await dbhelper(sqlforpost, createdpost);
      let message;
      if (createpost.protocol41 == true) {
        message = {
          code: successfuly.hompage_showed.code,
          message: successfuly.hompage_showed.message,
          status: successfuly.hompage_showed.status,
          post: createdpost,
          post_id: createpost.insertId,
        };
      } else {
        message = {
          code: failure.server_error.code,
          message: failure.server_error.message,
          status: failure.server_error.status,
        };
      }
      resolve(message);
      return;
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
      return;
    }
  });
};
const ai2 = async (req, res) => {
  return new Promise(async (resolve) => {
    try {
      const sqlforpost = "insert into posts SET ?";
      const sqlforprompt = "select * from settings where user_id = ?";
      const sqlfortopixapikey = "select * from users where id = ?";
      const user = await dbhelper(sqlfortopixapikey, req.id);
      const prompt = await dbhelper(sqlforprompt, req.id);
      const result = await gemini2(
        prompt[0].topic,
        prompt[0].language,
        prompt[0].sub_topic,
        prompt[0].mood
      );
      const data = result.response.candidates[0].content.parts[0].text;
      const dataJson = JSON.parse(data);
      const { title, body } = dataJson;
      console.log(body);
      const removeEmojis = (text) =>
        text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");

      const encodedBody = removeEmojis(body);
      const encodedTitle = removeEmojis(title);

      const createdpost = {
        user_id: req.id,
        title: encodedTitle,
        body: encodedBody,
      };
      const createpost = await dbhelper(sqlforpost, createdpost);
      let message;
      if (createpost.protocol41 == true) {
        message = {
          code: successfuly.hompage_showed.code,
          message: successfuly.hompage_showed.message,
          status: successfuly.hompage_showed.status,
          post: createdpost,
          post_id: createpost.insertId,
        };
      } else {
        message = {
          code: failure.server_error.code,
          message: failure.server_error.message,
          status: failure.server_error.status,
        };
      }
      resolve(message);
      return;
    } catch (error) {
      console.log(error);
      resolve(failure.server_error);
      return;
    }
  });
};
module.exports = { ai, ai2, gemini, gemini2 };
