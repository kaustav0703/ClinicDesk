const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Doctor = require('../models/doctorModel');

// ****** Passport Authentication ****** //
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secrethospitalkey"
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    // ****** Finding Doctor ****** //
    Doctor.findById(jwtPayLoad._id, function(err, user){ 
        if (err){ // ****** Error Handling ****** //
            console.log('Error in finding user from JWT'); 
            return done(err,false);}

        if (user){ // ****** If the user is found ****** //
            return done(null, user);
        }else{ // ****** If user is not found ****** //
            return done(null, false);
        }
    })

}));

module.exports = passport;
