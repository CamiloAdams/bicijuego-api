import { Schema, model } from "mongoose";

const questionSchema = new Schema(
    {
        pregunta: String,
        respuesta: Boolean,
        imgURL: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Question", questionSchema);
