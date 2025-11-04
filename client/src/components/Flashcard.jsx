import React from 'react'
import { useState } from "react";

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-48 sm:h-56 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Cara frontal (pregunta) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-2xl shadow-lg p-4 backface-hidden">
          <h3 className="text-lg font-semibold text-center">{question}</h3>
          <p className="text-sm mt-2 text-gray-300">
            Haz clic para ver la respuesta 👇
          </p>
        </div>

        {/* Cara trasera (respuesta) */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-700 text-white rounded-2xl shadow-lg p-4 backface-hidden rotate-y-180">
          <p className="text-xl font-bold text-center">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;