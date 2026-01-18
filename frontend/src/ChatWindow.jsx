import "./ChatWindow.css"
import Chat from "./Chat"

export default function ChatWindow() {

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

            <div className="chatInput">
                <div className="inputBox">
                    <input type="text" placeholder="Ask anything"/>
                    <div id="submit"><i className="fa-solid fa-paper-plane" /></div>
                </div>
                <p className="info">
                    GPTVerse can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}