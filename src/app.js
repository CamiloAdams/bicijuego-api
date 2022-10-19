import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles, createAdminUser } from "./libs/initialSetup";

import questionsRoutes from "./routes/questions.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

createRoles();
createAdminUser();

app.set("pkg", pkg);

app.use(express.json());
app.use(morgan("dev"));

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
export default app;
