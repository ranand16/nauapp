var mongoose = require('mongoose');
var User = require('server/models/user');

var express = require('express');
var secretKey = "its_really_very_secret";
var api = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
  var token = jsonwebtoken.sign({
      _id:user._id,
      name:user.name,
      username:user.username
    },secretKey);
    return token;
  }
  api.get('/check',function(req, res){
    res.send('working good!!');
  });

  api.post('/signup',function(req,res){
    var user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      acctype: req.body.acctype,
      gender: req.body.gender,
      city: req.body.city,
      address: req.body.address,
      exp: req.body.exp,
      rating: req.body.rating,
      speciality: req.body.speciality
    });
    user.save(function(err){
      if(err){
        res.json({failureMessage:"User Registration Failed"});
        return;
      }
      res.json({successMessage:"User has been created"});
    });
  });

  api.get('/users',function(req, res){
    User.find({},function(err, users){
      if(err){
        res.send(err);
        return;
      }
      res.send({users:users});
    });
  });

  api.post('/user', function(req, res){
    User.findOne({
      username:req.body.username
    }).exec(function(err, user){
        if(err) throw err;
        res.send({user:user});
    });
  });

  api.get('/hehe',function(req, res){
    console.log("Hey fellas...so much to do!!");
    res.send("Hey brother...!");
  });

  api.post('/login',function(req,res){
    User.findOne({username: req.body.username
    }).select('password').exec(function(err, user){
      if(err) throw err;
      if(!user){
        res.send({message: "user doesnot exist"});
      }else if (user) {
        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword){
          res.send({message: "Invalid Password"});
        }else{
          user.username = req.body.username;
          var token = createToken(user);
          res.json({
            success:true,
            message:"Logged in Successfully",
            token: token
          });
        }
      }
    });
  });

  api.use(function(req, res, next){
    console.log("We have a guest");
    var token = req.body.token ||  req.headers['x-access-token'] || req.headers['token'] ;
    //console.log(token);
    //check whether token exists
    if(token){
      jsonwebtoken.verify(token,secretKey,function(err,decoded){
        if(err){
          res.status(403).send({success:false, message:"Failed to authenticate user"});
        } else {
          req.decoded = decoded;
          //console.log(req.decoded);
          next();
        }
      });
    } else {
      res.status(403).send({success:false, message:"No token provided"});
    }
  });


// for sending message to other Users START
  api.route('/msg')
   .put(function(req, res){
     var message =[{
         cntnt: req.body.content,
         from: req.decoded.username
       }];
     //console.log(req.decoded.username);
     User.update({username: req.body.to},{ $push :{msg :{$each :message}}},function(err, result){
       //for more push types refer mongo db documentation
       // https://docs.mongodb.com/manual/reference/operator/update/push/#example-push-each
       if(err){
         res.send(err);
         return;
       }
       console.log("message sent successfully");
       res.json({message:"message sent successfully",
                 result:result
        });
     });
  });// for sending message to other users

  // with the valid token travel the other part of API
  api.route('/msg')
    .get(function(req, res){
      //console.log(req.decoded.username);
      User.find({_id: mongoose.Types.ObjectId(req.decoded._id)})
        .select('msg')
        .exec(function(err, msgs){
        if(err){
          res.send(err);
          return;
        }
        console.log("msgs loaded");
        res.json({msgs:msgs[0].msg});
        //res.json(todos[0].data[0]); res.json(todos[0]); res.json(todos); console.log(todos);
      });
    });


    // for posting jobs for other Users START
    api.route('/jobs')
     .put(function(req, res){
       var job =[{
           intro: req.body.intro,
           lastActive: req.body.lastActive,
           location : req.body.location,
           employees: req.body.employees,
           jobs: req.body.jobs
         }];
       //console.log(req.decoded.username);
       User.update({username: req.decoded.username},{ $push :{data :{$each :job}}},function(err, result){
         //for more push types refer mongo db documentation
         // https://docs.mongodb.com/manual/reference/operator/update/push/#example-push-each
         if(err){
           res.send(err);
           return;
         }
         console.log("Job posted successfully");
         res.json({message:"Job posted successfully",
                   result:result
          });
       });
    });// for posting jobs for other users



    api.route('/jobs')
      .get(function(req, res){
        //console.log(req.decoded.username);
        User.find({_id: mongoose.Types.ObjectId(req.decoded._id)})
          .select('msg')
          .exec(function(err, jobs){
          if(err){
            res.send(err);
            return;
          }
          console.log("jobs loaded");
          res.json({jobs:jobs[0].data});
          //res.json(todos[0].data[0]); res.json(todos[0]); res.json(todos); console.log(todos);
        });
      });



  //   .put(function(req, res){
  //     var todo =[{
  //         task: req.body.task,
  //         isCompleted: req.body.isCompleted,
  //         isEditing: req.body.isEditing
  //       }];
  //     //console.log(req.decoded.username);
  //     User.update({username: req.decoded.username},{ $push : {data :{$each : todo} }},function(err, result){
  //       //for more push types refer mongo db documentation
  //       // https://docs.mongodb.com/manual/reference/operator/update/push/#example-push-each
  //       if(err){
  //         res.send(err);
  //         return;
  //       }
  //       console.log("New Task Created successfully");
  //       res.json({message:"New Task created",
  //                 result:result
  //               });
  //     })
  //   })
  //


  //   api.route('/:id1/:id2')
  //   .put(function(req,res){
  //     var id1 = req.params.id1;//id for the user
  //     var id2 = req.params.id2;//id for the particular task
  //     User.update({"_id": mongoose.Types.ObjectId(id1),
  //                  "data._id": mongoose.Types.ObjectId(id2)},{ $set :{"data.$.task" : req.body.task}},function(err, result){
  //       if(err){
  //         res.send(err);
  //         return;
  //       }
  //       console.log("Task Updated on screen");
  //       res.json({message:"Task Updated",
  //                 result:result
  //               });
  //     });
  //   });


  //   api.route('/:id1')
  //   .put(function(req,res){
  //     var id1 = req.params.id1;//id for the particular task
  //     console.log(req.decoded.username);
  //     console.log(id1);
  //     User.update({username: req.decoded.username},
  //     { $pull :{data :{_id:mongoose.Types.ObjectId(id1)}}},
  //     function(err, result){
  //       if(err){
  //         res.send(err);
  //         return;
  //       }
  //       console.log("Task deleted");
  //       res.json({message:"Task deleted",
  //                 result:result
  //               });
  //     });
  //   });
  //

    api.get('/me',function(req, res){
      res.json({resp:req.decoded});
    });//for getting the decoded as many times we want for aa particular user session



  module.exports = api;
