const mongoose = require('mongoose');
var Subject = mongoose.model('Subjects',{
    subjectCode:{type: String},
    subjectName:{type: String},
    Semester: {type:String},
    Credits:{type:String},
    Type:{type:String},
    courseDetails:{type:{}}
}); 
module.exports={Subject};