const mongoose = require('mongoose');
var Department = mongoose.model('Department',{
    departmentCode:String,
    departmentName:String
}); 
module.exports={Department};