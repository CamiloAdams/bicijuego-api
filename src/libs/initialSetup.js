import Role from "../models/Role";
import User from "../models/User.js";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
};

export const createAdminUser = async () => {
    const userFound = await User.findOne({ email: "admin@bicijuego" });

    if (userFound) return;

    const newUser = new User({
        username: "admin",
        nombres: "admin",
        apellidos: "pro",
        fecha_nacimiento: "2002-12-09",
        email: "admin@bicijuego",
        password: await User.encryptPassword("baguiadmin"),
        guias_completadas: [],
        high_score: 0,
    });

    const foundRoles = await Role.find({ name: "admin" });

    newUser.roles = foundRoles.map((role) => role._id);

    const admin = await newUser.save();

    console.log("Admin user created", admin);
};
