import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Layout from "../components/Layout";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isConnectionOpen, setConnectionOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  const { username } = useParams();
  const ws = useRef();

  const sendMessage = () => {
    if (messageBody) {
      ws.current.emit(
        "message",
        JSON.stringify({
          sender: username,
          body: messageBody,
        })
      );
    }
  };

  useEffect(() => {
		console.log(import.meta.env.SERVER_PORT)
    ws.current = io(
      `http://localhost:${import.meta.env.VITE_REACT_APP_SERVER_PORT}`
    );
    ws.current.on("connect", () => {
      setConnectionOpen(true);
    });

    ws.current.on("message", (data) => {
      setMessages((_messages) => [..._messages, JSON.parse(data)]);
    });

    return () => {
      ws.current.disconnect();
			setConnectionOpen(false);
    };
  }, []);

  const scrollTarget = useRef(null);

  useEffect(() => {
    if (scrollTarget.current) {
      scrollTarget.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <Layout>
      <div
        id="chat-view-container"
        className="flex flex-col w-64 lg:w-1/3 max-h-96 overflow-y-auto overflow-x-hidden px-3"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-3 rounded py-3 w-8/12 lg:w-5/12 ${
              message.sender === username
                ? "self-end bg-cyan-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            <div className="flex items-center">
              <div className="mx-2 w-full">
                <div className="flex justify-between">
                  <div className="text-sm font-medium leading-5">
                    {message.sender}
                  </div>
                  <div className="ml-1 text-sm font-bold leading-5">
                    {message.sendAt}
                  </div>
                </div>
                <div className="text-wrap mt-1 text-sm font-semibold leading-5">
                  {message.body}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollTarget} />
      </div>
      <footer className="w-64 lg:w-1/3">
        <p className="text-white">
          Você está conversando como{" "}
          <span className="font-bold">{username}</span>
        </p>

        <div className="flex flex-row">
          <input
            id="message"
            type="text"
            className="w-full border-2 border-gray-200 focus:outline-none rounded-md p-2 hover:border-cyan-400"
            placeholder="Digite sua mensagem aqui"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
                setMessageBody("");
              }
            }}
            required
            disabled={!isConnectionOpen}
          />
        </div>
      </footer>
    </Layout>
  );
}
