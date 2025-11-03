import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate", async (req, res) => {
  console.log("📩 Petición recibida:", req.body);

  try {
    const { text, mode } = req.body;

    let prompt = "";
    if (mode === "Preguntas tipo test") {
      prompt = `
            Genera 10 preguntas tipo test sobre el siguiente texto:
            """${text}"""
          
            Devuelve **únicamente JSON válido**, con la siguiente estructura:
          
            {
              "questions": [
                {
                  "id": 1,
                  "question": "Texto de la pregunta con emojis si es posible",
                  "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
                  "answer": "Texto exacto de la opción correcta (debe coincidir con una de las opciones)"
                }
              ]
            }
          
            No incluyas explicaciones, títulos ni texto fuera del JSON.
            `;
    } else if (mode === "Flashcards") {
      prompt = `Crea 10 flashcards educativas (Pregunta / Respuesta) visualmente atractivas con emojis.
                Devuelve un texto claro y estructurado, no JSON.
        
                Texto: """${text}"""`;
    } else {
      prompt = `Resume este texto en 150 palabras con formato HTML amigable para mostrar en una app de IA:
                - Usa <p> para párrafos.
                - Usa <strong> para palabras clave o conceptos importantes.
                - Si tiene sentido, añade un título corto <h3> al principio.
                - No incluyas texto fuera del HTML.

                Texto: """${text}"""`;
    }

    console.log("🧠 Llamando a OpenAI... ");

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente educativo experto en la creación de preguntas tipo test y flashcards educativos.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const raw = response.choices[0].message.content;
    console.log("📝 Respuesta de OpenAI:", raw);

    const cleaned = raw.replace(/```[a-z]*|```/gi, "").trim();

    // Si es un test, esperamos JSON. En cualquier otro caso, devolvemos texto.
    if (mode === "Preguntas tipo test") {
      try {
        const data = JSON.parse(cleaned);
        res.json({ success: true, data });
      } catch (err) {
        console.error("❌ Error al parsear JSON:", err.message);
        res.json({ success: false, raw: cleaned });
      }
    } else {
      // Flashcards o resumen → se envía texto/HTML sin parsear
      res.json({ success: true, data: { text: cleaned } });
    }
  } catch (error) {
    console.error("🔥 Error en el servidor:", error);
    res.status(500).json({ error: "Error interno al generar contenido." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
