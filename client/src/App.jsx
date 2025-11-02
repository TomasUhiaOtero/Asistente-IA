import { useState } from "react";
import CustomSelect from "./components/customSelect";
import ActionBar from "./components/actionBar";
import GlitchH1 from "./components/GlitchH1";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("Preguntas tipo test");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");


  // Llamada a la API para generar el contenido
  const handleGenerate = async () => {
    if (!text.trim()) return alert("Por favor, escribe un texto o tema.");

    setLoading(true);
    setResult("");
    try {
      const res = await axios.post("http://localhost:3000/generate", {
        text,
        mode,
      });
      setResult(res.data.response);
    } catch (err) {
      console.error(err);
      alert("Error al generar contenido");
    } finally {
      setLoading(false);
    }
  };

  // Función para borrar el texto
  const handleClearText = () => {
    setText("");
    setResult("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-indigo-900 to-purple-900 flex flex-col items-center p-6">
      <GlitchH1 text="Asistente de Estudio con IA" />
      {/* Selector de modo */}
      <CustomSelect mode={mode} setMode={setMode} />

      {/* Textarea para el texto */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pega aquí el texto . . ."
        className="w-full max-w-xl p-4 rounded-2xl h-48 mb-6
             bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-950
             border border-gray-700 text-gray-100
             placeholder-gray-400 focus:outline-none
             focus:ring-2 focus:ring-purple-500 focus:border-purple-400
             shadow-lg shadow-purple-900/30 transition-all duration-300
             hover:shadow-purple-500/20 hover:border-purple-400 animate-slide-in-left"
      />
      {/* Barra de acciones */}
      <ActionBar handleGenerate={handleGenerate} handleClearText={handleClearText} loading={loading} />


      {result && (
        <div
          className="w-full max-w-xl mt-6 p-4 rounded-2xl
               bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950
               border border-gray-700 text-gray-100
               shadow-lg shadow-purple-900/30 animate-fade-in"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-3">📖 Resultado:</h2>
          <pre className="whitespace-pre-wrap text-gray-200 leading-relaxed">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
