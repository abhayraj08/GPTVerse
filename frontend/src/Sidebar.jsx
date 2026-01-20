import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from 'uuid'

export default function Sidebar() {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

    const getAllThread = async() => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            // console.log(filteredData);
            setAllThreads(filteredData)
        } catch(e) {
            console.log("Error in getting all thread : ", e);
        }
    }

    useEffect(() => {
        getAllThread();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`)
            const res = await response.json();
            // console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(e) {
            console.log("Loading problem error : ", e);
        }
    }

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId == currThreadId) {
                createNewChat();
            }
        } catch(e) {
            console.log("Delete Thread error : ", e);
        }
    }

    return (
        <section className="sidebar">
            {/* sidebar-header */}
            <div className="sidebar-header">
                <img onClick={createNewChat} src="src/assets/logo.png" alt="GPT logo" className="logo"/>
                <span onClick={createNewChat}><i className="fa-solid fa-pen-to-square"></i></span>
            </div>

            {/* history */}
            <ul className="history">
            <p>Your chats</p>
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} 
                            onClick={(e) => changeThread(thread.threadId)} 
                            className={thread.threadId == currThreadId ? "highlighted" : ""}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); //stop event bubbling
                                    deleteThread(thread.threadId);
                                }}
                            />
                        </li>
                    ))
                }
            </ul>

            {/* sign */}
            <div className="sign">
                <p>By Abhay </p>
            </div>
        </section>
    )
}