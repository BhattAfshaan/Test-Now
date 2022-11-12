const express = require("express")
var router = express.Router()
var { Result } = require("../models/result")

router.post("/", (req, res) => {
  var result = new Result({
    departmentID: req.body.departmentID,
    courseID: req.body.courseID,
    subjectID: req.body.subjectID,
    testID: req.body.testID,
    questionID: req.body.questionID,
    departmentName: req.body.departmentName,
    courseName: req.body.courseName,
    subjectName: req.body.subjectName,
    testName: req.body.testName,
    email: req.body.email,
    userName: req.body.userName,
    submittedAnswer: req.body.submittedAnswer,
    correctAnswer: req.body.correctAnswer,
    marksObtained: req.body.marksObtained,
    minMarks: req.body.minMarks,
    maxMarks: req.body.maxMarks,
  })
  result.save((err, doc) => {
    if (!err) {
      res.send(doc)
    } else {
      console.log("Error in Saving Data" + JSON.stringify(err, undefined, 2))
    }
  })
})

router.get("/", (req, res) => {
  Result.find((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log("Error in Retriving Results..!" + JSON.stringify(err))
    }
  })
})

router.get("/:email", (req, res) => {
  Result.aggregate(
    [
      { $match: { email: req.params.email } },
      {
        $group: {
          _id: "$testID",
          marks: { $sum: "$marksObtained" },
        },
      },
    ],
    function (err, result) {
      if (err) throw err
      res.send(result)
    }
  )
})
module.exports = router
