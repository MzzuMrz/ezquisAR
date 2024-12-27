import { agent } from "../agent/agent";
import axios from "axios";
// Importación de google-tts-api
const googleTTS = require("google-tts-api");
import fs from 'fs'

export const generateSong = async (prompt: string): Promise<string> => {
  try {
    const response = await agent.invoke(
      {
        messages: [
          {
            role: "user",
            content: `Escribí una canción completa sobre: ${prompt}. 
                      Incluí estrofas, estribillo, puente y final, menor a 200 caracteres.`,
          },
        ],
      },
      { configurable: { thread_id: "music-thread" } }
    );

    const lyrics =
      response.messages.pop()?.content || "Error al generar la canción.";
    return lyrics;
  } catch (error) {
    console.error("Error al generar la canción:", error);
    throw new Error("No se pudo generar la canción.");
  }
};

export const generateTTS = async (text: string): Promise<string[]> => {
  try {
    const urls = googleTTS.getAllAudioUrls(text, {
      lang: "es",
      slow: false,
      host: "https://translate.google.com",
    });

    const savedFiles = await Promise.all(
      urls.map(async (urlObj: { url: string }, index: number) => {
        const response = await axios.get(urlObj.url, {
          responseType: "arraybuffer",
        });

        const audioBuffer = Buffer.from(response.data, "binary");
        const filePath = `audio_part_${index + 1}.mp3`; // Nombre del archivo

        // Guardamos el archivo en el sistema
        fs.writeFileSync(filePath, audioBuffer);

        return filePath; // Retornamos el path del archivo guardado
      })
    );

    return savedFiles; // Retornamos la lista de archivos guardados
  } catch (error) {
    console.error("Error al generar audio TTS:", error);
    throw new Error("No se pudo generar el audio.");
  }
};
