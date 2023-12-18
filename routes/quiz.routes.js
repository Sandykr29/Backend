const express = require("express");
const {QuizModel}=require("../models/quiz.model")
const { admin } = require("../middleware/admin.middleware");

const quizRouter = express.Router();

quizRouter.post("/create", async (req, res) => {
  try {
    const quiz = new QuizModel(req.body);
    await quiz.save();
    res.status(200).send({ "msg": `A new quiz has been added ${quiz}` });
  } catch (error) {
    res.status(400).send({ "error": error });
  }
});

quizRouter.get("/", async (req, res) => {
  try {
    const quizzes = await QuizModel.find();
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(400).send({ "error": error });
  }
});

quizRouter.patch("/update/:quizID", admin, async (req, res) => {
    const { quizID } = req.params;
    try {
      const quiz = await QuizModel.findOne({ _id: quizID });
      if (req.body.username===quiz.username) {
        await QuizModel.findByIdAndUpdate({ _id: quizID },req.body);
        res.status(200).send({ "msg": `Quiz with ID:${quizID} has been deleted` });
      } else {
        res.status(200).send({ "msg": "You are not authorized" });
      }
    } catch (error) {
      res.status(400).send({ "error": error });
    }
  });
// quizRouter.patch("/update/:quizID",admin, async (req, res) => {
//   const { quizID } = req.params;
//   try {
//     const quiz = await QuizModel.findOne({ _id: quizID });
//     await QuizModel.findByIdAndUpdate({ _id: quizID }, req.body);

//   } catch (error) {
//     res.status(400).send({ "error": error });
//   }
// });

quizRouter.delete("/delete/:quizID", admin, async (req, res) => {
  const { quizID } = req.params;
  try {
    const quiz = await QuizModel.findOne({ _id: quizID });
    if (req.body.username===quiz.username) {
      await QuizModel.findByIdAndDelete({ _id: quizID });
      res.status(200).send({ "msg": `Quiz with ID:${quizID} has been deleted` });
    } else {
      res.status(200).send({ "msg": "You are not authorized" });
    }
  } catch (error) {
    res.status(400).send({ "error": error });
  }
});

module.exports = {
  quizRouter,
};
