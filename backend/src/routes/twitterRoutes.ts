import express, { Request, Response } from "express";
import { TwitterApi } from "twitter-api-v2";

const router = express.Router();

// Configuración de la API de Twitter
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET_KEY!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

// Ruta para publicar un tweet
router.post("/tweet", async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Tweet content is required" });
  }

  try {
    const result = await client.v2.tweet(content);
    return res.json({ message: "Tweet posted successfully", result });
  } catch (error) {
    console.error("Error posting tweet:", error);
    return res.status(500).json({ error: "Failed to post tweet" });
  }
});

export default router;
