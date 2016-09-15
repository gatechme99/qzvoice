var express     = require("express");
var router      = express.Router({mergeParams: true});
var passport    = require("passport");
var User        = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
   res.redirect("/qzvoice"); 
});

// SHOW SIGN UP FORM
router.get("/signup", function(req, res){
    res.render("signup");
});

router.post("/signup", function(req, res) {
    var newUser = new User({username: req.body.username});   
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to QuartzVoice!");
            res.redirect("/qzvoice");
        });
    });
});

// LOG IN
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/qzvoice",
        failureRedirect: "/login"
    }), function (req, res) {
});

//LOG OUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are now logged out!");
    res.redirect("/qzvoice");
});

module.exports = router;