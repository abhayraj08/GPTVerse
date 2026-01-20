import "./ChatWindow.css"
import Chat from "./Chat"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "./MyContext"
import { ScaleLoader } from "react-spinners"

export default function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [toggleReply, setToggleReply] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const getReply = async() => {
        setLoading(true);
        setNewChat(false);
        
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
            console.log("GPT ke API ke liye paaisa lagta hai : ", res);
            setReply(res.reply);
        } catch(e) {
            console.log("This is error : ", e);
        }
        setToggleReply((prev) => !prev); 
        setLoading(false);
    }

    // Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ))
        }

        setPrompt("");
    }, [toggleReply]); //reply

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>SigmaGPT
                    <div className="model">
                        4o-mini <i className="fa-solid fa-chevron-down" />
                    </div>
                </span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <i className="fa-solid fa-user" />
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }

            <Chat />

            <ScaleLoader color="white" loading={loading}/>

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