var mongoose    = require("mongoose");
var Suggestion  = require("./models/suggestion");
var Comment     = require("./models/comment");

var data = [
    
    {
        title: "Test Title A", 
        descr: "Meggings sartorial pinterest readymade fashion axe ennui, chillwave distillery keffiyeh chia waistcoat. Single-origin coffee kinfolk neutra humblebrag pork belly intelligentsia. Plaid cronut yuccie, fingerstache whatever mixtape 90's gastropub. Jean shorts PBR&B health goth paleo swag intelligentsia. Hella thundercats swag chillwave. Food truck swag pug man bun cold-pressed, freegan mumblecore leggings kickstarter yuccie flexitarian kinfolk offal dreamcatcher polaroid."
    },
    
    {
        title: "Test Title B", 
        descr: "Mustache pickled umami, taxidermy sartorial PBR&B plaid hoodie ethical fixie forage meggings pour-over. Farm-to-table iPhone blog man braid, kogi ethical ennui venmo cornhole kitsch neutra hashtag. Post-ironic marfa four loko butcher, cred +1 schlitz health goth ramps locavore put a bird on it blog austin gluten-free stumptown. Chartreuse tote bag heirloom farm-to-table, hashtag yuccie paleo artisan art party asymmetrical everyday carry."
    },
    
    {
        title: "Test Title C", 
        descr: "Gochujang cornhole kombucha ennui poutine. Next level VHS umami jean shorts bicycle rights. Venmo whatever wolf food truck, XOXO polaroid crucifix keytar 90's flannel roof party asymmetrical mustache. Pabst VHS +1 taxidermy you probably haven't heard of them blog. Pinterest sustainable echo park freegan. Health goth typewriter sartorial, stumptown irony aesthetic chillwave man braid brunch 8-bit swag freegan."
    }
]

function seedDB(){
    //Remove all campgrounds
    Suggestion.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed suggestions");
        //add a few campgrounds
//         data.forEach(function(seed){
//             Suggestion.create(seed, function(err, suggestion){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log("Added a suggestion");
//                 }
//             });
//         });
    }); 
}

module.exports = seedDB;