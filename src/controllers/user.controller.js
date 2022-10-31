import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Guide from "../models/Guide";

export const getUsers = async (req, res) => {
    const users = await User.find().populate("guias_completadas", {
        texto: 0,
        imagenes: 0,
        createdAt: 0,
        updatedAt: 0,
    });
    res.json(users);
};

export const getUserInformation = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const user = await User.findById(decoded.id, {
            password: 0,
            roles: 0,
        }).populate("guias_completadas", {
            texto: 0,
            imagenes: 0,
            createdAt: 0,
            updatedAt: 0,
        });

        if (!user) return res.status(404).json({ message: "No user found" });

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const deleteUserById = async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(204).json();
};

export const addReadGuides = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];
        const id_guia = req.body.id_guia;

        if (!token)
            return res.status(403).json({ message: "No token provided" });

        const decoded = await jwt.verify(token, config.SECRET);

        const guide = await Guide.findOne({ _id: id_guia });

        if (!guide) return res.status(404).json({ message: "Guide not found" });

        const user = await User.findById(decoded.id, {
            password: 0,
            roles: 0,
        });

        if (!user) return res.status(404).json({ message: "No user found" });

        var guias = user.guias_completadas;

        if (!guias.includes(guide._id)) {
            guias.push(guide._id);
            const userUpdate = await User.findByIdAndUpdate(user._id, {
                guias_completadas: guias,
            });
            res.status(200).json({ message: "Guide added" });
            // console.log(userUpdate);
        } else {
            res.status(201).json({ message: "Guide already read" });
        }

        // user.guias_completadas.forEach((guia) => {
        //     if (guia._id == guide._id) {
        //         console.log("encontrao");
        //     }
        // });

        // res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
