const mongoose = require("mongoose")
var Result = mongoose.model("Result", {
  departmentID: { type: String },
  courseID: { type: String },
  subjectID: { type: String },
  testID: { type: String },
  questionID: { type: String },
  departmentName: { type: String },
  courseName: { type: String },
  subjectName: { type: String },
  testName: { type: String },
  email: { type: String },
  userName: { type: String },
  submittedAnswer: { type: String },
  correctAnswer: { type: String },
  marksObtained: { type: Number },
  minMarks: { type: Number },
  maxMarks: { type: Number },
})
module.exports = { Result }
