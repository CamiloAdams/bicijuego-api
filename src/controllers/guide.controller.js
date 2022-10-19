import Guide from "../models/Guide";

export const createGuide = async (req, res) => {
    const { nombre, texto, imagenes } = req.body;

    const newGuide = new Guide({ nombre, texto, imagenes });

    const guideSaved = await newGuide.save();

    res.status(201).json(guideSaved);
};

export const getGuides = async (req, res) => {
    const guides = await Guide.find();
    res.json(guides);
};

export const getGuideById = async (req, res) => {
    await Guide.findById(req.params.guideId, function (err, data) {
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

export const updateGuideById = async (req, res) => {
    try {
        const updatedGuide = await Guide.findByIdAndUpdate(
            req.params.guideId,
            req.body,
            { new: true }
        );
        if (!updatedGuide)
            return res.status(400).json({ message: "Guide not found" });
        res.status(200).json(updatedGuide);
    } catch (error) {
        console.log(error);
    }
};

export const deleteGuideById = async (req, res) => {
    const { guideId } = req.params;
    await Guide.findByIdAndDelete(guideId);
    res.status(204).json();
};
