import express from "express";
import cors from "cors";
import agentRoutes from "./routes/agentRoutes";
import twitterRoutes from "./routes/twitterRoutes";
import { TwitterApi } from "twitter-api-v2";
import cron from "node-cron";
import { agent } from "./agent/agent"; 

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET_KEY!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

const generateRandomTweet = async (): Promise<string> => {
  try {
    const response = await agent.invoke(
      {
        messages: [{ role: "user", content: "Genera un tweet random y original" }],
      },
      { configurable: { thread_id: "tweet-thread" } }
    );
    const tweet = response.messages.pop()?.content || "Error al generar tweet";
    return tweet;
  } catch (error) {
    console.error("Error al generar tweet:", error);
    return "Error al generar tweet. Intenta más tarde.";
  }
};

cron.schedule("*/15 * * * *", async () => {
  console.log("entra")
  const tweetContent = await generateRandomTweet(); 
  try {
    const result = await client.v2.tweet(tweetContent);
    console.log(`Tweet publicado automáticamente: ${tweetContent}`);
  } catch (error) {
    console.error("Error al publicar tweet automáticamente:", error);
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", agentRoutes);
app.use("/twitter", twitterRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
