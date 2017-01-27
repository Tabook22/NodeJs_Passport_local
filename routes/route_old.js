var express           =require('express');
var router            =express.Router();
var passport          =require('passport');
var localStrategy     =require('passport-local'),Strategy; 
var db                =require('../config/db.js'); //db file contains all tokens and other private info
var funct             =require('../config/functions.js'); //funct file contains our helper functions for our Passport and database work
var User              =require('../models/user.js');
var userController    =require('../controllers/userController');
//==============PASSPORT=======================================================
// Use the LocalStrategy within Passport to login/"signin" users.
passport.use('local-signin', new localStrategy(
  function(req, username, password, done) {
    User.getUserByUsername(username, function(err,user){
        if(err) throw err; //if there is an error just throw it to us
        if(!user){
            return done(null, false,{message:'Unknown User'});
        }
        //If the user is found then we are going to check the password
        //here we create another function inside the model and we call it comparePassword
        User.comparePassword(password,user.password,function(err,isMatch){
           if(err) throw err;
           if(isMatch){
               return done(null, user);
           }else{
               return done(null, false, {message:'Invalid password'});
           }
        });
    });
  }));

// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new localStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));


// the serialization and deserialization of users into and out of the session.
// Passport session setup.
//serilize user and deserialize user --------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/signin');
}




//Homepage or Dashboard
router.get('/', function(req,res){
    res.render('./pages/index',{layout:'./layouts/mainlayout'});
});

//User Controller-----------------------------------------------------------------------------------------------
router.get('/login',userController.loginGet);
router.post('/login',passport.authenticate('local-signin',{successRedirect:'/', failureRedirect:'/users/login',failurFlash:true}),userController.loginPost);
router.get('/logout',userController.logout);
router.get('/register',userController.register);
router.post('/register',userController.registerUser);

module.exports=router;