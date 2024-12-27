// src/services/tweetService.ts
import { agent } from "../agent/agent";

export const generateRandomTweet = async (): Promise<string> => {
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
