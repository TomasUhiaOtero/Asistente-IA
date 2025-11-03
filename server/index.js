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
  console.log("Peticion recibida: ", req.body);

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
      prompt = `Crea 10 flashcards educativas visualmente atractivas con emoticonos etc (Pregunta / Respuesta) a partir de este texto:\n\n${text}`;
    } else {
      prompt = `Resume este texto en 150 palabras:\n\n${text} destacando en negrita las palabras clave del resumen`;
    }

    console.log("Llamando a OpenAI... ");

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

    console.log("Respuesta de OpenAI: ", response.choices[0].message.content);

    const raw = response.choices[0].message.content;

    const cleaned = raw.replace(/```json|```/gi, "").trim();

    let data;
    
    try {
      data = JSON.parse(cleaned); // parseamos el JSON
      res.json({ success: true, data });
    } catch (err) {
      console.error("Error al parsear JSON:", err.message);
      res.json({ success: false, raw }); // enviamos raw si falló
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
