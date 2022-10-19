import Question from "../models/Question";

export const createQuestion = async (req, res) => {
    const { pregunta, respuesta, imgURL } = req.body;

    const newQuestion = new Question({ pregunta, respuesta, imgURL });

    const productSaved = await newQuestion.save();

    res.status(201).json(productSaved);
};

export const getQuestions = async (req, res) => {
    res.json("get");
};

export const getQuestionById = async (req, res) => {
    await Question.findById(req.params.questionId, function (err, data) {
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

export const updateQuestionById = async (req, res) => {
    const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.questionId,
        req.body
    );
    res.status(200).json(updatedProduct);
};

export const deleteQuestionById = async (req, res) => {
    const { questionId } = req.params;
    await Question.findByIdAndDelete(questionId);
    res.status(204).json();
};
