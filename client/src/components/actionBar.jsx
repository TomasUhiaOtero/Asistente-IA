import { useState, useEffect } from "react";

export default function ActionButtons({ handleGenerate, handleClearText, loading }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Al montar el componente, activamos la animación
        setAnimate(true);

        // Quitamos la clase de animación después de 500ms 
        const timeout = setTimeout(() => setAnimate(false), 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex flex-row gap-4 w-full max-w-xl">
            {/* Botón Generar */}
            <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full max-w-xs p-3 rounded-2xl
                    bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-950
                    text-gray-100 font-semibold text-lg
                    border border-gray-700 shadow-lg shadow-purple-900/30
                    hover:shadow-purple-500/20 hover:border-purple-400
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400
                    transition-all duration-300 mb-4 hover:animate-pop
                    ${animate ? "animate-slide-in-bottom" : ""}`}
            >
                {loading ? "Generando..." : "✨ Generar"}
            </button>

            {/* Botón Borrar texto */}
            <button
                onClick={handleClearText}
                disabled={loading}
                className={`w-full max-w-xs p-3 rounded-2xl
                    bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-950
                    text-gray-100 font-semibold text-lg
                    border border-gray-700 shadow-lg shadow-purple-900/30
                    hover:shadow-purple-500/20 hover:border-purple-400
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400
                    transition-all duration-300 mb-4 hover:animate-pop
                    ${animate ? "animate-slide-in-bottom delay-200" : ""}`}
            >
                Borrar texto
            </button>
        </div>
    );
}