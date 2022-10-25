const mongoose = require('mongoose');
var Test = mongoose.model('Test',{
    testCode:{type: String},
    testName:{type: String},
    testDate: {type:String},
    testStartTime:{type:String},
    testEndTime:{type:String},
    testQuestions:{type:[]}
}); 
module.exports={Test};