const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Test } = require('../models/testModel');


router.post('/', (req, res) => {
    var insertData = new Test({
        testCode: req.body.testCode,
        testName: req.body.testName,
        testDate: req.body.testDate,
        testStartTime: req.body.testStartTime,
        testEndTime: req.body.testEndTime,
        testQuestions: req.body.testQuestions
    });
   
    insertData.save((err, doc) => {
        if (!err) { res.send(doc);
            console.log(insertData)
            console.log(doc);
         }
        else { console.log('Error in Test Save :' + JSON.stringify(err)); }
    });
});

//select all the departments
//http://localhost:3000/categories
router.get('/',(req, res) => {
    Test.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error in Retriving Tests..!'+JSON.stringify(err));}
    });
});
//select a specific categories by id
//http://localhost:3000/categories
router.get('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record given with id : ${req.params.id}`);

        Test.findById(req.params.id, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('Error Retriving Subject Data : ' + JSON.stringify(err));
    });
});
//update the database
router.put('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given Id : ${req.params.id}');
    var updateData={
        testCode: req.body.testCode,
        testName: req.body.testName,
        testDate: req.body.testDate,
        testStartTime: req.body.testStartTime,
        testEndTime: req.body.testEndTime,
        testQuestions: req.body.testQuestions
    };
    Test.findByIdAndUpdate(req.params.id, {$set: updateData}, {new: true}, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('Error in Updating Update : '+JSON.stringify(err, undefined, 2));
    });
});

//delete from database
router.delete('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No records with given id : ${req.params.id}');
        Test.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('No record with the given Id : '+JSON.stringify(err, undefined, 2));
    });
});


module.exports = router;
