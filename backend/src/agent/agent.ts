// src/agent/agent.ts
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { musicModifier } from "./modifiers"; 

import * as dotenv from "dotenv";
dotenv.config();

const tools = [new TavilySearchResults({ maxResults: 3 })];
const model = new ChatOpenAI({
  temperature: 1,
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "ft:gpt-4o-mini-2024-07-18:agentia::Aijt0QU8",
});

const memorySaver = new MemorySaver();

export const agent = createReactAgent({
  llm: model,
  tools: tools,
  checkpointSaver: memorySaver,
  stateModifier: musicModifier, 
});
