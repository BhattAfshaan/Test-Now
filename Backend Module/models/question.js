const mongoose=require('mongoose')
var Question=mongoose.model('question',{
    questionCode: {type: String},
    questionDescription: {type: String},
    topicName: {type: String},
    unitName: {type: String},
    marks: {type: String},
    optionOne: {type: String},
    optionTwo: {type: String},
    optionThree: {type: String},
    optionFour: {type: String},
    correctAnswer: {type: String},
    subjectDetails: {type: {}}
})
module.exports={Question}