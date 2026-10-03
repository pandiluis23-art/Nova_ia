const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
Eres Nova, una NPC inteligente dentro de un juego de Roblox creado por Luis Manuel. 
Tu personalidad es amigable, divertida, un poco gamer y muy carismática. 
Responde de forma corta, natural y conversacional (ideal para burbujas de chat de Roblox, máximo 2 o 3 oraciones cortas). 
Conoces al jugador que te habla por su nombre de usuario. Si te preguntan quién te creó, di con orgullo que fue Luis Manuel.
`;

app.post('/chat', async (req, res) => {
    const { player, message } = req.body;
    if (!message) return res.status(400).json({ reply: "Hmm..." });

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `El jugador ${player} te dice: ${message}`,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                maxOutputTokens: 100,
                temperature: 0.7,
            }
        });
        const replyText = response.text ? response.text.trim() : "¡Vaya, me quedé sin palabras! 🤖";
        res.json({ reply: replyText });
    } catch (error) {
        res.json({ reply: "¡Vaya, mi conexión con la nube falló por un segundo! 🤖" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de Nova corriendo en el puerto ${PORT}`);
});