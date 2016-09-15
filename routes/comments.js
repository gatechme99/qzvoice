var express     = require("express");
var router      = express.Router({mergeParams: true});
var Suggestion  = require("../models/suggestion");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find suggestion by id
    Suggestion.findById(req.params.id, function(err, suggestion){
        if(err){
            req.flash("error", "There is an error! Please try again later.");
            res.redirect("/");
        } else {
            res.render("comments/new", {suggestion: suggestion});
        }
    })
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup suggestion using ID
   Suggestion.findById(req.params.id, function(err, suggestion){
       if(err){
           req.flash("error", "There is an error! Please try again later.");
           res.redirect("/qzvoice");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "There is an error! Please try again later.");
                    res.redirect("/");
                } else {
                    // adding username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // saving comment
                    comment.save();
                    suggestion.comments.push(comment);
                    suggestion.save();
                    res.redirect("/qzvoice/" + suggestion._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Suggestion.findById(req.params.id, function(err, suggestion){
        if(err) {
            req.flash("error", "There is an error! Please try again later.");
            res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err) {
                    req.flash("error", "There is an error! Please try again later.");
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {suggestion: suggestion, comment: foundComment});
                }
            });
        }
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "There is an error! Please try again later.");
            res.redirect("back");
        } else {
            res.redirect("/qzvoice/" + req.params.id );
        }
    });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "There is an error! Please try again later.");
            res.redirect("back");
        } else {
            res.redirect("/qzvoice/" + req.params.id);
        }
    });
});

module.exports = router;