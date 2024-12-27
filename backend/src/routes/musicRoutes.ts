// src/routes/musicRoutes.ts
import { Router, Request, Response } from "express";
import { generateSong, generateTTS } from "../services/musicService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json({ error: "Falta el prompt para generar la canción." });
    }

    const lyrics = await generateSong(prompt);

    // Guardamos las partes de audio en archivos físicos
    const savedFiles = await generateTTS(lyrics);

    res.json({
      lyrics,
      savedFiles, // Retornamos los paths de los archivos generados
    });
  } catch (error) {
    console.error("Error en /music:", error);
    res.status(500).json({ error: "Error interno al generar la música." });
  }
});

export default router;
