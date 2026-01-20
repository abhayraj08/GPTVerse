import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";

export default function Sidebar() {
    const {allThreads, setAllThreads, currThreadId} = useContext(MyContext);

    const getAllThread = async() => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            console.log(filteredData);
            setAllThreads(filteredData)
        } catch(e) {
            console.log("Error in getting all thread : ", e);
        }
    }

    useEffect(() => {
        getAllThread();

    }, [currThreadId]);

    return (
        <section className="sidebar">
            {/* new chat button */}
            <button>
                <img src="src/assets/blacklogo.png" alt="GPT logo" className="logo"/>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* history */}
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx}>{thread.title}</li>
                    ))
                }
            </ul>

            {/* sign */}
            <div className="sign">
                <p>By Abhay &hearts;</p>
            </div>
        </section>
    )
}