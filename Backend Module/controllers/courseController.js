const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Course } = require('../models/courseModel');


router.post('/', (req, res) => {
    var course = new Course({
        courseCode: req.body.courseCode,
        courseTitle: req.body.courseTitle,
        departmentDetails: req.body.departmentDetails
    });
   
    course.save((err, doc) => {
        if (!err) { res.send(doc);
           
            console.log(doc);
         }
        else { console.log('Error in Course Save :' + JSON.stringify(err)); }
    });
});

//select all the courses
//http://localhost:3000/courses
router.get('/',(req, res) => {
    Course.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error in Retriving Course..!'+JSON.stringify(err));}
    });
});
//select a specific course by id
//http://localhost:3000/courses
router.get('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record given with id : ${req.params.id}`);

        Course.findById(req.params.id, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('Error Retriving Course Data : ' + JSON.stringify(err));
    });
});
//update the database
router.put('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given Id : ${req.params.id}');
    var updateData={
        courseCode: req.body.courseCode,
        courseTitle: req.body.courseTitle,
        departmentDetails: req.body.departmentDetails
    };
    Course.findByIdAndUpdate(req.params.id, {$set: updateData}, {new: true}, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('Error in Updating Update : '+JSON.stringify(err, undefined, 2));
    });
});

//delete from database
router.delete('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');
        Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('No record with the given Id : '+JSON.stringify(err, undefined, 2));
    });
});


module.exports = router;
