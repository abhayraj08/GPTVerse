import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(express.json());  //lets your server read JSON data --> req.body
app.use(cors());  // lets your frontend talk to your backend

// https://platform.openai.com/docs/api-reference/chat?lang=node.js
app.post('/test', async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: req.body.message
      }]
    })
  };


  try{
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json();
    // console.log(data);
    res.send(data);
  } catch (e) {
    console.log("This is error : ", e);
  }
})




app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})