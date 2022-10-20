import Score from "../models/Score";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const createScore = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, { password: 0 });

        if (!user) return res.status(404).json({ message: "No user found" });

        const { respuestas_correctas } = req.body;

        if (respuestas_correctas > user.high_score) {
            const updateHighScore = await User.findByIdAndUpdate(
                decoded.id,
                { high_score: respuestas_correctas },
                { new: true }
            );
            console.log(updateHighScore);
        }

        const newScore = new Score({
            id_usuario: decoded.id,
            respuestas_correctas,
        });

        const scoreSaved = await newScore.save();

        res.status(201).json(scoreSaved);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const getScores = async (req, res) => {
    const scores = await Score.find();
    res.json(scores);
};

export const getScoreById = async (req, res) => {
    await Score.findById(req.params.scoreId, function (err, data) {
        if (!err) {
            res.status(200).json(data);
        } else {
            console.error;
            res.status(500).json("An error has ocurred");
        }
    })
        .clone()
        .catch(function (err) {
            console.log("An error has ocurred");
        });
};

export const updateScoreById = async (req, res) => {
    try {
        const updatedScore = await Question.findByIdAndUpdate(
            req.params.scoreId,
            req.body,
            { new: true }
        );
        if (!updatedScore)
            return res.status(400).json({ message: "Score not found" });
        res.status(200).json(updatedScore);
    } catch (error) {
        console.log(error);
    }
};

export const deleteScoreById = async (req, res) => {
    const { scoreId } = req.params;
    await Score.findByIdAndDelete(scoreId);
    res.status(204).json();
};
