import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import NavRooms from "./Components/NavRooms/NavRooms";
import Chat from "./Components/Chat/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
    const [username, setUsername] = useState("");
    const [rooms, setRooms] = useState([]);
    const [connectedRoomId, setConnectedRoomId] = useState("");
    const [receivedNewMessage, setReceivedNewMessage] = useState(null);
    const [messages, setMessages] = useState([]);

    const emitMyName = () => {
        socket.emit("clientToServerMyName", { username: username });
    };
    const emitAddNewRoom = (roomName) => {
        socket.emit("clientToServerAddNewRoom", { id: roomName });
    };
    const emitMessage = (newMsg) => {
        if (!newMsg) return;
        socket.emit("clientToServerMessage", {
            ownerId: socket.id,
            ownerName: username,
            msg: newMsg,
        });
    };
    const emitJoinRoom = (room) => {
        socket.emit("clientToServerJoinRoom", { room: room });
        setConnectedRoomId(room);
    };

    useEffect(() => {
        socket.on("serverToClientRoomList", (data) => {
            setRooms(data.roomList);
        });
        socket.on("serverToClientMessage", (data) => {
            const newMsg = {
                ownerId: data.ownerId,
                ownerName: data.ownerName,
                msg: data.msg,
            };
            setReceivedNewMessage(newMsg);
        });
    }, [socket]);
    useEffect(() => {
        emitMyName();
    }, [username]);
    useEffect(() => {
        if (!receivedNewMessage) return;
        const msgs = [...messages];
        msgs.push(receivedNewMessage);
        setMessages(msgs);
    }, [receivedNewMessage]);

    return (
        <div className="App">
            <Header
                username={username}
                setUsername={setUsername}
                emitMyName={emitMyName}
            />

            <NavRooms
                rooms={rooms}
                emitAddNewRoom={emitAddNewRoom}
                emitJoinRoom={emitJoinRoom}
            />

            <Chat
                roomId={connectedRoomId}
                messages={messages}
                emitMessage={emitMessage}
            />
        </div>
    );
}

export default App;
