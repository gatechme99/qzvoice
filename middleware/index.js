var Suggestion = require("../models/suggestion");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkSuggestionOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Suggestion.findById(req.params.id, function(err, foundSuggestion) {
            if(err) {
                req.flash("error", "Suggestion not found!");
                res.redirect("back");
            } else {
                // does user own the suggestion?
                if(foundSuggestion.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in first!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in first!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please log in first!");
    res.redirect("/login");
}

module.exports = middlewareObj;