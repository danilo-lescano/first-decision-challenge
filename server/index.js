import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const expressServer = app.listen(3001, () => {
    console.log("running");
});

const io = new Server(expressServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const userList = [];
const addNewUser = ({ id }) => {
    userList.push({
        username: "",
        id: id,
    });
};

const roomList = [];

io.on("connection", (socket) => {
    let room = "geral";
    addNewUser({ id: socket.id });

    socket.emit("serverToClientRoomList", { roomList });
    socket.join(room);

    //CLIENT TO SERVER ADD NAME TO CLIENT
    socket.on("clientToServerMyName", (data) => {
        userList.find((user) => socket.id === user.id).username = data.username;
    });

    //CLIENT TO SERVER ADD NEW ROOM
    socket.on("clientToServerAddNewRoom", (data) => {
        roomList.push({
            id: data.id,
            usercount: 0,
            ownerId: socket.id,
        });
        io.emit("serverToClientRoomList", { roomList });
    });

    //CLIENT TO SERVER SEND MESSAGE
    socket.on("clientToServerMessage", (data) => {
        io.to(room).emit("serverToClientMessage", data);
    });

    //CLIENT TO SERVER JOIN ROOM
    socket.on("clientToServerJoinRoom", (data) => {
        socket.leave(room);
        let i = roomList.findIndex((r) => r.id === room);
        if (i >= 0) roomList[i].usercount--;
        room = data.room;
        socket.join(room);
        i = roomList.findIndex((r) => r.id === room);
        if (i >= 0) roomList[i].usercount++;
        io.emit("serverToClientRoomList", { roomList });
    });
});
