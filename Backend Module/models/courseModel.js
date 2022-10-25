const mongoose = require('mongoose');
var Course = mongoose.model('Course',{ //give model name in singular so that it chnages to plural
    courseCode:{type: String},
    courseTitle:{type: String},
    departmentDetails: {type:{}}
    
}); 
module.exports={Course};