// src/index.ts
import { createServer } from "./server";
import * as dotenv from "dotenv";

dotenv.config(); // Cargamos variables de entorno .env

const PORT = process.env.PORT || 3001;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
