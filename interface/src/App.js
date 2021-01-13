import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);


const App = () => 
{
    //react hooks state declaration
    const [messages, setMessages] = useState(["Hello And Welcome"]);
    const [message, setMessage] = useState("");

    // useEffect hook for each time the message length changes 
    useEffect(() => {
        getMessages();
    }, [messages.length]);

    // Function to be called everytime the length changes(which include the first interation
    // on the page
    const getMessages = () => {
        socket.on("message", msg => {
            setMessages([...messages, msg]);
        });
    };

    // Input onChange function
    const onChange = e => {
        setMessage(e.target.value);
    };


    // Button onClick function
    const onClick = () => {
        if(message !== "") {
            socket.emit("message", message);
            setMessage("");
        }
        else {
            alert("Please Add a Message");
        }
    };

    return (
        <div>
            {/* loop responsible to print each message on the array */}
            {messages.length > 0 &&
                messages.map(msg => (
                   <div>
                        <p>{msg}</p>
                    </div>
                ))}
            <input value={message} name="message" onChange={e => onChange(e)} />
                <button onClick={() => onClick()}>Send Message</button>
        </div>
  );
};

export default App;
