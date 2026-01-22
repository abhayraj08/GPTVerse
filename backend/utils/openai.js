import "dotenv/config";


// https://platform.openai.com/docs/api-reference/chat?lang=node.js
const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
        const data = await response.json();
        // console.log(data);
        try{
            return data.choices[0].message.content;
        } catch (e) {
            return data.error.message;
        }
    } catch (e) {
        console.log("This is error : ", e);
    }
}

export default getOpenAIAPIResponse;