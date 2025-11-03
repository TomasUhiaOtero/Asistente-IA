import { useState, useEffect } from "react";
import CustomSelect from "./components/customSelect";
import ActionBar from "./components/actionBar";
import GlitchH1 from "./components/GlitchH1";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("Preguntas tipo test");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const [questions, setQuestions] = useState([]); // preguntas tipo test
  const [quizMode, setQuizMode] = useState(false); // true si estamos en examen

  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  function handleCheckTest() {
    setShowResults(true);
  }

  useEffect(() => {
    console.log("Respuestas almacenadas:", answers);
  }, [answers]);



  // Llamada a la API para generar el contenido
  const handleGenerate = async () => {
    if (!text.trim()) return alert("Por favor, escribe un texto o tema.");

    setLoading(true);
    setResult("");
    setQuestions([]);
    setQuizMode(false);
    try {
      const res = await axios.post("http://localhost:3000/generate", { text, mode })
      console.log("📦 Respuesta completa del servidor:", res);

      if (res.data.success) {
        // Si el modo es test, mostramos preguntas
        if (mode === "Preguntas tipo test") {
          setQuestions(res.data.data.questions);
          setQuizMode(true);
        } else {
          // Si es resumen o flashcards → mostramos el texto devuelto
          setResult(res.data.data.text || res.data.raw || "Sin contenido disponible.");
        }
      } else {
        setResult(res.data.raw || "Error al generar contenido");

      }
    }
    catch (err) {
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

  function handleFinishTest() {
    // Limpiamos el estado del test
    setAnswers({});
    setShowResults(false);
    setResult("");
    setQuizMode(false); // cerramos el modo examen
    setQuestions([]);   // opcional: limpiar preguntas si quieres empezar de nuevo
    setText("");
  }

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

      {/* Si quizMode esta en true muestra el test */}
      {quizMode && (
        <div className="w-full max-w-xl mt-6 p-4 rounded-2xl
                  bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950
                  border border-gray-700 text-gray-100
                  shadow-lg shadow-purple-900/30 animate-fade-in">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">📝 Examen Interactivo</h2>

          {questions.map((q) => (
            <div key={q.id} className="mb-6">
              <p className="text-lg mb-2">{q.question}</p>
              <ul className="list-disc list-inside space-y-1">
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    className={`text-gray-200 p-1 rounded cursor-pointer
                              ${answers[q.id] === opt ? "bg-purple-700/50" : "hover:bg-purple-700/30"}
                              ${showResults && opt === q.answer ? "border border-green-500" : ""}
                               ${showResults && answers[q.id] === opt && opt !== q.answer ? "border border-red-500" : ""}
                               `}
                    onClick={() => {
                      if (!showResults) { // impedir cambiar respuesta después de corregir
                        const newAnswers = { ...answers, [q.id]: opt };
                        setAnswers(newAnswers);
                      }
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-4">
            {/* Si showResults esta en false se meustra el boton para corregir, que cambia el estado a true y despues muestra el de finalizar que devuelve a false*/}
            {!showResults && (
              <button
                onClick={handleCheckTest}
                className=" bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow-md transition"
              >
                Corregir test
              </button>
            )}

            {showResults && (
              <button
                onClick={handleFinishTest}
                className=" bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-md transition ml-2"
              >
                Finalizar examen
              </button>
            )}

          </div>

        </div>
      )}


      {/*Si resultado es true muestra lo que devuelve la api */}
      {result && (
        <div className="w-full max-w-xl mt-8">
          <div
            className="flex items-start gap-3 p-5 rounded-2xl
           bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950
           border border-purple-700/40 shadow-lg shadow-purple-900/40
           text-gray-100 animate-fade-in relative overflow-hidden"
          >
            {/* Icono IA animado */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-800/40 animate-pulse">
              🤖
            </div>

            {/* Texto generado */}
            <div
              className="prose prose-indigo text-gray-100"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
