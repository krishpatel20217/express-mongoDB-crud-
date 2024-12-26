var express = require('express');
var router = express.Router();
var UserModel = require('../models/Users1')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
});
router.post('/add', function(req, res, next) {
  var bodydata = {
    name: req.body.txt1,
    mobile: req.body.txt2,
    email: req.body.txt3,
    password: req.body.txt4
    }
    var mydata = UserModel(bodydata);
    mydata.save();
    res.send("Record Added");
});

 router.get('/display', function(req, res, next) {
  UserModel.find()
 .then(data=>{
 console.log(data);
 res.render('display', { mydata:data });
 })
 .catch(err=>console.log("Error"+err));
});
router.get('/show/:id', function(req, res, next) {
 var myid= req.params.id;
 res.send("url is"+myid);
});
router.get('/delete/:id', function(req, res, next) {
  var myid= req.params.id;
  UserModel.findByIdAndDelete(myid)
  .then(data=>{
    res.redirect('/display');  
  })
  .catch(err=>{
    console.log("error"+err)
  })
 });










 router.get('/edit/:id', function(req, res, next) {
  var myid= req.params.id
  // res.send("id is"+myid)
  UserModel.findById(myid)
  .then(data=>{
    res.render('edit', { mydata:data });
  })
  .catch(err=>{
    console.log("error"+err)
  })
 });





 router.post('/update/:id', function(req, res, next) {
  var myid= req.params.id;
  var mydata = {
    name: req.body.txt1,
    mobile: req.body.txt2,
    email: req.body.txt3,
    password: req.body.txt4
    }
    UserModel.findByIdAndUpdate(myid,mydata)
    .then(data=>{
      res.redirect('/display');  
    })
    .catch(err=>{
      console.log("error"+err)
    })
});


module.exports = router;
