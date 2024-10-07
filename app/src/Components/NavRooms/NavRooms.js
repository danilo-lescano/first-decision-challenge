import { useState } from "react";
import "./NavRooms.css";

const Room = ({ room, emitJoinRoom }) => {
    return (
        <span className="nav-room-item" onClick={() => emitJoinRoom(room.id)}>
            <span>{`Nome: ${room.id}`}</span>
            <span className="nav-room-item-membros">{`Membros: ${room.usercount}`}</span>
        </span>
    );
};

const NavRooms = ({ rooms = [], emitAddNewRoom, emitJoinRoom }) => {
    const [newRoom, setNewRoom] = useState("");

    return (
        <nav>
            <span className="nav-rooms-title">SALAS</span>
            <span className="rooms-wrapper">
                {rooms.map((room) => {
                    return (
                        <Room
                            key={room.id}
                            room={room}
                            emitJoinRoom={emitJoinRoom}
                        />
                    );
                })}
            </span>

            <form
                className="nav-rooms-form"
                action="changeName"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="nav-input-text"
                    type="text"
                    placeholder="Nome da sala"
                    required
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                />
                <button
                    className="nav-input-btn"
                    onClick={() => {
                        if (!newRoom) return;
                        emitAddNewRoom(newRoom);
                        setNewRoom("");
                    }}
                >
                    Nova Sala
                </button>
            </form>
        </nav>
    );
};

export default NavRooms;
