import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(express.json());

// Inicializa con la variable de entorno GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { player, message } = req.body;
        
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Eres Nova, un NPC inteligente en un juego de Roblox. Un jugador llamado ${player} te ha dicho: "${message}". Responde de forma amigable, corta y adaptada a un chat de juego.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Error al generar contenido con Gemini:", error);
        res.status(500).json({ reply: "¡Vaya, ocurrió un error interno en el servidor!" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor de Nova corriendo en el puerto ${PORT}`);
});
