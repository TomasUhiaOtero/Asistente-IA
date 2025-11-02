import { useState } from "react";

export default function CustomSelect({ mode, setMode }) {
    const [open, setOpen] = useState(false);
    const options = ["Preguntas tipo test", "Flashcards", "Resumen"];

    return (
        <div className="relative w-full max-w-xl mb-6 mt-5">
            {/* Botón principal del select */}
            <button
                onClick={() => setOpen(!open)}
                className="animate-pulse w-full p-3 rounded-2xl
             bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-950
             text-gray-100 border border-gray-700 shadow-lg shadow-purple-900/30
             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400
             text-lg cursor-pointer transition-all duration-300
             hover:shadow-purple-500/20 flex flex-row items-center justify-between"
            >
                <span className="flex-1 text-center">{mode}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-2"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" />
                </svg>
            </button>

            {/* Lista de opciones */}
            {open && (
                <ul className="absolute w-full mt-1 bg-gray-900 rounded-lg shadow-lg z-50
                       animate-slide-in-down overflow-hidden">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => {
                                setMode(option);
                                setOpen(false);
                            }}
                            className="p-3 text-gray-100 hover:bg-purple-500/30 cursor-pointer rounded-lg transition-colors"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}