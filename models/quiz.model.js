const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    questions: [
      {
        question: String,
        options: [String],
        answerIndex: Number,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const QuizModel = mongoose.model("quiz", quizSchema);

module.exports = {
  QuizModel,
};
