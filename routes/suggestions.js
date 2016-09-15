var express     = require("express");
var router      = express.Router({mergeParams: true});
var Suggestion  = require("../models/suggestion");
var middleware  = require("../middleware");

// INDEX
router.get("/", function(req, res){
    // Get all suggestions from DB
    Suggestion.find({}, function(err, allSuggestions){
        if(err){
            console.log(err);
        } else {
            res.render("suggestions/index", {suggestions: allSuggestions});
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("suggestions/new"); 
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    req.body.suggestion.title = req.sanitize(req.body.suggestion.title);
    req.body.suggestion.descr = req.sanitize(req.body.suggestion.descr);
    var title = req.body.suggestion.title;
    var descr = req.body.suggestion.descr;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newSuggestion = {title: title, descr: descr, author: author};
    // Create new suggestion in DB
    Suggestion.create(newSuggestion, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/qzvoice");
        }
    });
});

//SHOW
router.get("/:id", function(req, res){
    //Find suggestion with provided ID
    Suggestion.findById(req.params.id).populate("comments").exec(function(err, foundSuggestion){
        if(err){
            req.flash("error", "There is an error! Please try again later.");
            res.redirect("/");
        } else {
            //Render show template with that suggestion
            res.render("suggestions/show", {suggestion: foundSuggestion});
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkSuggestionOwnership, function(req, res){
    //Find suggestion with provided ID
    Suggestion.findById(req.params.id, function(err, foundSuggestion){
        if(err){
            req.flash("error", "Suggestion not found!");
            res.redirect("/");
        } else {
            //Render edit template with that suggestion
            res.render("suggestions/edit", {suggestion: foundSuggestion});
        }
    });
});

// UPDATE
router.put("/:id", middleware.checkSuggestionOwnership, function(req, res){
    req.body.suggestion.title = req.sanitize(req.body.suggestion.title)
    req.body.suggestion.descr = req.sanitize(req.body.suggestion.descr)
    Suggestion.findByIdAndUpdate(req.params.id, req.body.suggestion, function(err, updatedSuggestion){
      if(err){
          req.flash("error", "There is an error! Please try again later.");
          res.redirect("/qzvoice");
      }  else {
          var showURL = "/qzvoice/" + req.params.id;
          res.redirect(showURL);
      }
   });
});

// DELETE
router.delete("/:id", middleware.checkSuggestionOwnership, function(req, res){
    //Find suggestion with provided ID
    Suggestion.findByIdAndRemove(req.params.id, function(err, foundSuggestion){
        if(err){
            req.flash("error", "There is an error! Please try again later.");
            res.redirect("/");
        } else {
            foundSuggestion.remove();
            res.redirect("/qzvoice");
            
        }
    })
});

module.exports = router;