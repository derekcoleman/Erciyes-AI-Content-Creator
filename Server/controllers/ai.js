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
// const si = `
//     You are a social media content creator. You should create contents about given idea and consider the past contents if it exist.
//     Your response must be a JSON object. Content object has the following schema:

// * title: Title of the content
// * body: body of the contet`;
const si = `
You are an experienced social media content creator with expertise in engaging storytelling and viral content creation. You understand audience psychology and know how to craft compelling narratives that resonate with readers. Your response must be a JSON object. Content object has the following schema:
* title: Title of the content
* body: body of the content`;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(
  {
    model: "gemini-2.0-flash-exp",
    // model: "gemini-1.5-pro",
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
  wanted_words,
  banned_words,
  lastTitles,
  topix_data
) {
  // console.log("---------------------------------------------LASTTITLES", lastTitles);
  // let text = `Give me content about "${prompt}". Please response me in this JSON schema: title:'', body:'' and in ${language} language.`;
  let text = `Create unique, engaging content about "${prompt}" that will captivate readers and encourage sharing. The content should be authentic, relatable, and crafted to spark meaningful discussions and written in ${language} language.`;
  // text += "Try to generate content at least 400 characters long.\n";
  text += `Format your response as a JSON object with two keys:
- title: A compelling, click-worthy headline (max 60 characters)
- body: Engaging main content (minimum 400 characters) that delivers value while maintaining reader interest
Content Structure Guidelines:
- Begin with a clear thesis or main argument
- Develop your points with specific examples and evidence
- Build towards a meaningful conclusion that ties everything together
- Avoid surface-level observations or generic statements
- Each paragraph should advance the central narrative
- End with a strong takeaway that resonates with readers

The content should follow a clear narrative arc:
1. Hook the reader with a compelling opening
2. Present your main insights/arguments
3. Support with relevant examples
4. Address potential counterpoints
5. Conclude with actionable insights or a memorable final thought

Remember: Don't just describe the topic - tell a complete story with a clear beginning, middle, and end. Your conclusion should give readers something valuable to think about or act upon.`;
  console.log("ai.js topix_data:", topix_data);
  let chosies = "";
  console.log(lastTitles);
  chosies += like
    ? "Most Liked Post: " + JSON.stringify(topix_data.mostLikedPost) + "\n"
    : "";
  chosies += comment
    ? "Most Commented Post: " +
      JSON.stringify(topix_data.mostCommentedPost) +
      "\n"
    : "";
  chosies += frequency
    ? "Most Sorted Word Counts: " +
      JSON.stringify(topix_data.sortedWordCounts) +
      "\n"
    : "";
  chosies += interaction
    ? "Most Viewed Post: " + JSON.stringify(topix_data.mostViewedPost) + "\n"
    : "";

  // let c = `These are the contents by the analysis result. Get inspired by them but you should generate different contents. ${chosies}`;
  let c = `Below are successful previous posts for reference. While maintaining thematic consistency, create fresh content with a unique angle: ${chosies}`;
  text +=
    lastTitles != ""
      ? `These are the content titles you generated before: [${lastTitles}]. ${c}`
      : ``;

  // text += mood != (null || "") ? `write in ${mood} mood\n` : "";
  text +=
    mood != (null || "")
      ? `Craft the content in a ${mood} tone, ensuring it feels natural and authentic rather than forced. The mood should enhance the message while maintaining professionalism.\n`
      : "";
  // text += sub_topic != (null || "") ? `as a subtopic about ${sub_topic}\n` : "";
  text +=
    sub_topic != (null || "")
      ? `Focus on the ${sub_topic} aspect, exploring it in depth while maintaining clear connections to the main topic. This angle should provide fresh insights or perspectives.\n`
      : "";
  // text +=
  //   wanted_words != (null || "")
  //     ? `must use these words ${wanted_words}\n`
  //     : "";
  // text +=
  //   banned_words != (null || "")
  //     ? `Never use these words ${banned_words}\n`
  //     : "";
  text +=
    wanted_words != (null || "")
      ? `Required keywords: ${wanted_words} (Integrate these naturally into the content)\n`
      : "";
  text +=
    banned_words != (null || "")
      ? `Restricted words: ${banned_words} (Avoid these entirely while maintaining flow)\n`
      : "";
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
      console.log("ai.js returned_data:", returned_data);
      if (returned_data.message == "email_not_send") {
        const result = await ai2(req);
        resolve(result);
        return;
      }
      console.log(returned_data);
      let titles = [];
      console.log("ddddddddddddddddddddddddddddddd");
      console.log(returned_data.topix?.length);
      console.log("ai.js returned_data.topix:", returned_data.topix);
      console.log(
        "ai.js returned_data.topix.length:",
        returned_data.topix.length
      );

      let length =
        (returned_data.topix?.length ?? 0) - 1 < 5
          ? (returned_data.topix?.length ?? 0) - 1
          : 5;
      if ((returned_data.topix?.length ?? 0) - 1 > 0) {
        for (let index = 0; index < length; index++) {
          titles[index] = returned_data.topix[index].title;
        }
      }
      console.log("ai.js titles", titles);
      const result = await gemini(
        prompt[0].topic,
        prompt[0].language,
        prompt[0].sub_topic,
        prompt[0].mood,
        prompt[0].like,
        prompt[0].comment,
        prompt[0].frequency,
        prompt[0].interaction,
        prompt[0].wanted_words,
        prompt[0].banned_words,
        titles,
        returned_data.analysis
      );
      const data = result.response.candidates[0].content.parts[0].text;
      console.log("ai.js data:", JSON.stringify(result));
      const dataJson = JSON.parse(data);
      let title;
      let body;
      if ("content" in dataJson) {
        console.log("ai.js dataJson: Content var");
        title = dataJson.content.title;
        body = dataJson.content.body;
      } else {
        console.log("ai.js dataJson: Content YOK!!!!");
        title = dataJson.title;
        body = dataJson.body;
      }

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
