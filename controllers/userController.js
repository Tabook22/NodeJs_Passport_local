var User=require('../models/user');

//----------------------------------------------------------------------------------------------------------
// here inside the /routes/index.js we deteramin routes , so any route asking for "get login"" will be routed or directed to loginGet property which will direct the requst to a function with the same name loginGet, and any 
//requesto to "post login", will be directed to loginPost property and then will directed to a function loginPost, and any request asking for register will be directed to register propetrty, and that propety will direct the request to a function with the same name and so on
module.exports={
    loginGet:loginGet,
    loginPost:loginPost,
    register:register,
    logout:logout,
    registerUser:registerUser
}

//Login function get-----------------------------------------------------------------------------------------
function loginGet(req,res){
    //TODO:login code
     res.render('./pages/login',{layout:"./layouts/mainLayout",success_msg:'success_msg'});
    //   res.render('./pages/login',{layout:"./layouts/mainLayout",success_msg:req.flash('success_msg')});
     
}

//Login function post-----------------------------------------------------------------------------------------
function loginPost(req,res){
   console.log("الحمد لله عدد خلقة وزنه عرشة");
   res.render('./pages/index',{layout:"./layouts/mainLayout"});

}

//Register function--------------------------------------------------------------------------------------------- 
errors=[];
function register(req,res){
    //TODO:Register code
     res.render('./pages/register',{errors:errors,layout:"./layouts/mainLayout"});
}

//Logout function------------------------------------------------------------------------------------------------- 
function logout(req,res){
    //TODO:Logout code
    req.logout();
    res.redirect('/users/login');
}

//Register New user function--------------------------------------------------------------------------------------
function registerUser(req,res){
    var vname=req.body.name;
    var vemail=req.body.email;
    var vusername=req.body.username;
    var vpassword=req.body.password;
    var vpassword2=req.body.password2;

    // Validation the field which come from the form 
    req.checkBody('name','Name is required').notEmpty().isLength({min:4});
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','Username is required').notEmpty().isLength({min:4});
    req.checkBody('password','Password is required').notEmpty().isLength({min:4}).equals(req.body.password2);
    req.checkBody('password2','Passwords do not match').notEmpty();

    //Storing the validation errors
    var errors= req.validationErrors();

    if(errors){
        // here in the case of errors we open register page and pass the errors to it
        res.render('./pages/register',{layout:'./layouts/mainLayout',
            errors:errors
        })
    }else{
        //Here we create a new object as an instance of the the user object, then each property of that object will hold the data stored inside the variables whic we declared them at the top of the page
       var newUser=new User({
           name:vname,
           email:vemail,
           username:vusername,
           password:vpassword
       });

       //User is a variable which was created inside the user model
       User.createUser(newUser,function(err,user){
           if(err) throw err;
           console.log(user);
       });

       //create a success message
       //req.flash('success_msg','You are registered and can now login'); //this message can be used inside the login page
       res.redirect('/users/login');
    }

}