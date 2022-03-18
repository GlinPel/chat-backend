import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "../App.css";

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  return (
    <div className="chat">
      <div className="mensajes">
        {mensajes.map((e, i) => (
          !e.mensaje.includes("ha entrado en la sala") ?
            <div key={i} className={`mensaje ${e.nombre === nombre ? "iam" : null}`}>
              <div className="nombre">{e.nombre}</div>
              <div>{e.mensaje}</div>
            </div>
            : <div>{e.mensaje}</div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit} className="form">
        <textarea
          cols="5"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
        <button className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
