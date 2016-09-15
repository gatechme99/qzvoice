var mongoose = require("mongoose");

var suggestionSchema = new mongoose.Schema({
   title: String,
   descr: String,
   author: {
         id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Suggestion", suggestionSchema)