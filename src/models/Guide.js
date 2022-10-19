import { Schema, model } from "mongoose";

const guideSchema = new Schema(
    {
        nombre: String,
        texto: [String],
        imagenes: [String],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Guide", guideSchema);
