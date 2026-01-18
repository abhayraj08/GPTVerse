import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

// Database Connection
const MONGO_URL = process.env.DB_URL;
mongoose.connect(MONGO_URL)
  .then(() => console.log('Database is connected'))
  .catch((e) => console.log('Error', e))

// Middleware
app.use(express.json());  //lets your server read JSON data --> req.body
app.use(cors());  // lets your frontend talk to your backend

// Routes
app.use("/api", chatRoutes);


// https://platform.openai.com/docs/api-reference/chat?lang=node.js
// app.post('/test', async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [{
//         role: "user",
//         content: req.body.message
//       }]
//     })
//   };

//   try{
//     const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data = await response.json();
//     // console.log(data);
//     res.send(data);
//   } catch (e) {
//     console.log("This is error : ", e);
//   }
// })



// Server Listening
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})