// const express = require("express")
// const app=express()

// const port=3000
// app.use(express.json())

// app.post("/",(req,res)=>{
//     fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Authorization": "Bearer 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",
//           "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//           "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
//           "messages": [
//             {"role": "user", "content":req.body.msg}
//           ],
//           "top_p": 1,
//           "temperature": 0.7,
//           "repetition_penalty": 1
//         })
//       }).then((val)=>{
//         return val.json()
//       }).then((val)=>{
//         res.send(val)
//       })
// })
// server.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
    fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "HTTP-Referer": "<YOUR_SITE_URL>",
            "X-Title": "<YOUR_SITE_NAME>",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
            "messages": [
                { "role": "user", "content": req.body.msg }
            ],
            "top_p": 1,
            "temperature": 0.7,
            "repetition_penalty": 1
        })
    })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

