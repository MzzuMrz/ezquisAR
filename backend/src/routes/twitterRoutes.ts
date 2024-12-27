// src/routes/twitterRoutes.ts
import { Router } from "express";
import { TwitterApi } from "twitter-api-v2";
import { generateRandomTweet } from "../services/tweetService";

const router = Router();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET_KEY!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

// Ejemplo de endpoint para publicar un tweet
router.post("/publish", async (req, res) => {
  try {
    const tweetContent = await generateRandomTweet();
    const result = await client.v2.tweet(tweetContent);
    console.log(`Tweet publicado: ${tweetContent}`);
    res.json({ message: "Tweet publicado", tweetContent });
  } catch (error) {
    console.error("Error al publicar tweet:", error);
    res.status(500).json({ error: "Error al publicar tweet." });
  }
});

export default router;
