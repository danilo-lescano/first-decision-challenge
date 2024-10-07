import { useState } from "react";
import "./Chat.css";

const Chat = ({ roomId, messages, emitMessage }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleMessage = () => {
        emitMessage(newMessage);
    };

    return (
        <div className="chat-wrapper">
            <span className="chat-rooms-title">
                Sala: {roomId ? roomId : "Geral"}
            </span>
            <span className="msgs-wrapper">
                {messages.map((msg, index) => (
                    <span
                        className="chat-msg"
                        key={`chat-msg-${index}`}
                    >{`${msg.ownerName}: ${msg.msg}`}</span>
                ))}
            </span>

            <form
                className="chat-rooms-form"
                action="changeName"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="chat-input-text"
                    type="text"
                    placeholder="Mensagem..."
                    required
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="chat-input-btn" onClick={handleMessage}>
                    Enviar Mensagem
                </button>
            </form>
        </div>
    );
};

export default Chat;
