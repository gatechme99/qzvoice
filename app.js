var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    flash                   = require("connect-flash"),
    Suggestion              = require("./models/suggestion"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    seedDB                  = require("./seed"),
    bodyParser              = require("body-parser"),
    expressSanitizer        = require("express-sanitizer"),
    methodOverride          = require("method-override");
    
var indexRoutes             = require("./routes/index"),
    commentsRoutes          = require("./routes/comments"),
    suggestionsRoutes       = require("./routes/suggestions");

// APP CONFIG
var url = process.env.DATABASEURL || "mongodb://localhost/qzvoice";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// AUTH CONFIG
app.use(require("express-session")({
    secret: "Grady is the best baby in the world!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// ROUTES CONFIG
app.use("/", indexRoutes);
app.use("/qzvoice", suggestionsRoutes);
app.use("/qzvoice/:id/comments", commentsRoutes);

app.listen(process.env.PORT, process.env.IP);