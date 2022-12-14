import { Schema, model } from "mongoose";

const scoreSchema = new Schema(
    {
        id_usuario: {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        respuestas_correctas: Number,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Score", scoreSchema);
