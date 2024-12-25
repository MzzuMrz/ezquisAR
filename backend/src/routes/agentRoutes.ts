import express from "express";
import { agent } from "../agent/agent";

const router = express.Router();

router.post("/interact", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await agent.invoke(
      { messages: [{ role: "user", content: message }] },
      { configurable: { thread_id: "chat-thread" } }
    );
    res.json({ response: response.messages.pop()?.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process the message." });
  }
});

export default router;
