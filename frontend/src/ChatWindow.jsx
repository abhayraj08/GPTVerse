import "./ChatWindow.css"
import Chat from "./Chat"
import { useContext, useState } from "react"
import { MyContext } from "./MyContext"
import { ScaleLoader } from "react-spinners"

export default function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    
    const getReply = async() => {
        setLoading(true);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        }

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(e) {
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT
                    <div className="model">
                        4o-mini <i className="fa-solid fa-chevron-down" />
                    </div>
                </span>
                <div className="userIconDiv">
                    <i className="fa-solid fa-user" />
                </div>
            </div>

            <Chat />

            <ScaleLoader color="green" loading={loading}/>

            <div className="chatInput">
                <div className="inputBox">
                    <input type="text"
                        placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    />
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane" /></div>
                </div>
                <p className="info">
                    GPTVerse can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}