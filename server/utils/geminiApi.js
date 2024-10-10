import {GoogleGenerativeAI} from '@google/generative-ai'

 const genAI =new GoogleGenerativeAI(process.env.GEMINI_KEY)

 const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'})

 async function generateResponse(message){ 
    const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "You are going to tbe talking to people on  a a chat app i made . Be hospitable and talk in a  casual tone analyse their texts and respond in an appropriate way" }],
          }
        ],
      });
    const res = await chat.sendMessage(message)
    console.log(res.response.text());
    return res.response.text()
 }

 export default generateResponse;