import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import cors from "cors";

import { createRoles, createAdminUser } from "./libs/initialSetup";

import questionsRoutes from "./routes/questions.routes";
import authRoutes from "./routes/auth.routes";
import guidesRoutes from "./routes/guides.routes";
import scoreRoutes from "./routes/score.routes";
import userRoutes from "./routes/user.routes";
import statsRoutes from "./routes/stats.routes";

const app = express();

createRoles();
createAdminUser();

app.set("pkg", pkg);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        name: app.get("pkg").name,
        author: app.get("pkg").author,
        description: app.get("pkg").description,
        version: app.get("pkg").version,
    });
});

app.use("/api/questions", questionsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/guides", guidesRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stats", statsRoutes);
export default app;
