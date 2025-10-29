import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

app.post("/generate", async (req, res) => {

    try {
        const { text, mode } = req.body;

        let prompt = "";
        if (mode === "Preguntas tipo test") {
            prompt = `Genera 5 preguntas tipo test sobre el siguiente texto, con 4 opciones (A-D) y la respuesta correcta:\n\n${text}`;
        } else if (mode === "Flashcards") {
            prompt = `Crea 10 flashcards educativas (Pregunta / Respuesta) a partir de este texto:\n\n${text}`;
        } else {
            prompt = `Resume este texto en 150 palabras:\n\n${text}`;
        }

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres un asistente educativo experto en la creación de preguntas tipo test y flashcards educativos." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });


        res.json({ response: response.choices[0].message.content });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});