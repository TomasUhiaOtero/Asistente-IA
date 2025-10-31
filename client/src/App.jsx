import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("Preguntas tipo test");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!text.trim()) return alert("Por favor, escribe un texto o tema.");

    setLoading(true);
    setResult("");
    try {
      const res = await axios.post("http://localhost:3000/generate", {
        text,
        mode,
      });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Error al generar contenido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Asistente de Estudio con IA</h1>

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option>Preguntas tipo test</option>
        <option>Flashcards</option>
        <option>Resumen</option>
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pega aquí el texto o tema..."
        className="w-full max-w-xl p-3 border rounded mb-4 h-48"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generando..." : "✨ Generar"}
      </button>

      {result && (
        <div className="mt-6 w-full max-w-xl bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Resultado:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
