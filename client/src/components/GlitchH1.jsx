import React from "react";
import "./GlitchH1.css"; // Creamos un archivo CSS aparte

export default function GlitchH1({ text }) {
  return <h1 className="glitch" data-text={text}>{text}</h1>;
}