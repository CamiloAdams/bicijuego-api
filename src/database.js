import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost/bicijuegodb")
    .then((db) => console.log("Db is connected"))
    .catch((error) => console.log(error));
