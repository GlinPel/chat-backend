import React, { useState } from "react";
import Chat from "./componentes/Chat";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className="container">
      <div className="header">MERN Chat</div>
      {!registrado && (
        <div className="login">
          <h2>Get started right now!</h2>
          <form onSubmit={registrar}>
            <label>I want to start chating with my name</label>
            <input placeholder="My name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <button className="btn btn-success">Start Chating</button>
          </form>
        </div>
      )}

      {registrado && <Chat nombre={nombre} />}
    </div>
  );
}

export default App;
