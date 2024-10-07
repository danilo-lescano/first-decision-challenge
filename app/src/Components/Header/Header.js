import { useState } from "react";
import "./Header.css";

const Header = ({ username, setUsername }) => {
    const [inputHeaderName, setInputHeaderName] = useState("");

    return (
        <header>
            {!username && (
                <form
                    className="header-form"
                    action="changeName"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        className="header-input-text"
                        type="text"
                        value={inputHeaderName}
                        placeholder="Coloque seu nome aqui"
                        onChange={(e) => setInputHeaderName(e.target.value)}
                        required
                    />
                    <button
                        className="header-input-btn"
                        onClick={() => setUsername(inputHeaderName)}
                    >
                        Adicionar Nome
                    </button>
                </form>
            )}
            {username && (
                <span className="bem-vindo-span">Bem vindo, {username}</span>
            )}
        </header>
    );
};

export default Header;
