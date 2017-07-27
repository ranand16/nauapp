var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var msgSchema = new Schema({
  cntnt:{type: String, required: true},
  from: {type: String, required: true}
});

var dataSchema = new Schema({
  intro:  {type: String, required: true},
  employees:  {type: Number, required: true},
  intrestedIn:{type: String, required: false},
  lastActive:  {type: String, required: false},
  wesite: {type: String, required: false}
});

var jobSchema = new Schema({
  type: {type: String, required: true}, // fulltime or partime or internship or contract
  Job:  {type: String, required: true},
  package: {type: String, required: true}
});

var UserSchema = new Schema({
  name: String,
  username: {type: String, required: true, index:{unique:true}},
  password: {type: String, required: true, select: false},
  acctype: {type: String, required: true},
  gender: {type: String, required: false},
  city: {type: String, required: false},
  address: {type:String, required: false},
  // exp: {type:String, required: false},
  // rating: {type:Number, required: false},
  // speciality: {type: Array, required: false},

  msg: [msgSchema],
  jobData: [jobSchema],
  data: [dataSchema]
});

UserSchema.pre('save',function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.hash(user.password,null,null,function(err,hash){
    if(err) return next(err);

    user.password = hash;
    next();
  });
});
UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password, user.password);
}
module.exports =  mongoose.model('user',UserSchema);
