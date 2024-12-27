// src/server.ts
import express from "express";
import cors from "cors";
import agentRoutes from "./routes/agentRoutes";
import twitterRoutes from "./routes/twitterRoutes";
import musicRoutes from "./routes/musicRoutes";

import cron from "node-cron";
import { generateRandomTweet } from "./services/tweetService";
import { TwitterApi } from "twitter-api-v2";

// Configuramos TwitterApi (si querés, podés mover esto a otro archivo config)
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET_KEY!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

// (Opcional) Ejemplo de cron job, descomentá si querés usarlo
// cron.schedule("*/15 * * * *", async () => {
//   const tweetContent = await generateRandomTweet(); 
//   try {
//     await client.v2.tweet(tweetContent);
//     console.log(`Tweet publicado automáticamente: ${tweetContent}`);
//   } catch (error) {
//     console.error("Error al publicar tweet automáticamente:", error);
//   }
// });

export const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Rutas
  app.use("/api", agentRoutes);
  app.use("/twitter", twitterRoutes);
  app.use("/music", musicRoutes);

  return app;
};
