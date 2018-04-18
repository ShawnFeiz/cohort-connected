(()=>{
    const express = require('express')
        , passport = require('passport')
        , bodyParser = require('body-parser')
        , mongoose = require('mongoose')
        , routes = require('./routes')
        , app = express()
        , passportSetup = require('./config/passport-setup')
        , keys = require('./config/keys')
        , PORT = process.env.PORT || 3001

    const cookieSession = require('cookie-session');
    // set up session cookies
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    }));

    // configure Express
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // Serve up static assets
    app.use(express.static("client/build"));
    // Add routes, both API and view
    app.use(routes);

    // Connect to the Mongo DB
    //mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cohortconnected");

    // Start the API server
    app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
})();