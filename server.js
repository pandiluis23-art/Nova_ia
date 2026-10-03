import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

// Inicializa la SDK usando la variable de entorno GEMINI_API_KEY
const ai = new GoogleGenAI();

app.post('/chat', async (req, res) => {
    try {
        const { player, message } = req.body;
        
        // Usamos el modelo estándar actual
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Eres Nova, un NPC inteligente en un juego de Roblox. Un jugador llamado ${player} te ha dicho: "${message}". Responde de forma amigable, corta y adaptada a un chat de juego.`,
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("Error al generar contenido con Gemini:", error);
        res.status(500).json({ reply: "¡Vaya, ocurrió un error interno en el servidor!" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor de Nova corriendo en el puerto ${PORT}`);
});
