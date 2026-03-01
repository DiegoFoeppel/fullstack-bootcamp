import express from "express";
import bodyParser from "body-parser";
import capitalRoutes from "./routes/capitalRoutes.js";
import flagRoutes from "./routes/flagRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/capitals", capitalRoutes);
app.use("/flags", flagRoutes);

export default app;

export { app };
