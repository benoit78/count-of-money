const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');



module.exports = (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: "1046286040557-hvelfuhkij1g1ucs3lbb5352eeqmrdkf.apps.googleusercontent.com" ,
      clientSecret: "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",
      callbackURL: 'http://localhost:5000/google/callback'
      },
      async function(accessToken, refreshToken, profile, cb) {
        try {
          let user = await User.findOne({ googleId: profile.id })
          if (user) cb(null, user);
          else {
            console.log("test du else", profile)
            user = await User.create({
              googleId: profile.id,
              role: 'user',
              email: profile.emails[0].value,
              date: Date.now(),
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              name: profile.displayName
            })
            cb(null, user)
          }
        } catch (err) {
          console.error(err)
        }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
};

// // Créez une nouvelle stratégie Google
// const googleStrategy = new GoogleStrategy({
//   // options for google strategy
//   clientID: "1046286040557-hvelfuhkij1g1ucs3lbb5352eeqmrdkf.apps.googleusercontent.com" ,
//   clientSecret: "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",
//   callbackURL: 'http://localhost:3000'
// }, (accessToken, refreshToken, profile, done) => {
//   // Vérifiez si l'utilisateur existe déjà dans votre base de données
//   User.findOne({ googleId: profile.id }).then((currentUser) => {
//     if (currentUser) {
//       // Si l'utilisateur existe, appelez le callback avec l'utilisateur
//       done(null, currentUser);
//     } else {
//       // Sinon, créez un nouvel utilisateur et sauvegardez-le dans la base de données
//       new User({
//         googleId: profile.id,
//         role: 'user',
//         email: profile.emails[0].value,
//         date: Date.now(),
//         firstname: profile.name.givenName,
//         lastname: profile.name.familyName,
//         name: profile.displayName
//         // Ajoutez tous les autres champs que vous souhaitez enregistrer pour votre utilisateur
//       }).save().then((newUser) => {
//         // Appelez le callback avec le nouvel utilisateur
//         done(null, newUser);
//       });
//     }
//   });
// });

// module.exports = googleStrategy;

// Enregistrez la stratégie Google auprès de Passport
// passport.use(googleStrategy.name('google'), googleStrategy);

// const googleStrategy = new GoogleStrategy({
//   // options for google strategy
//   clientID: "1046286040557-hvelfuhkij1g1ucs3lbb5352eeqmrdkf.apps.googleusercontent.com" ,
//   clientSecret: "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",
//   callbackURL: 'http://localhost:3000/auth/google/redirect'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// )

// passport.use(new GoogleStrategy({
//   // options for google strategy
//   clientID: "1046286040557-hvelfuhkij1g1ucs3lbb5352eeqmrdkf.apps.googleusercontent.com" ,
//   clientSecret: "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",
//   callbackURL: 'http://localhost:3000/auth/google/redirect'
// },  async function(accessToken, refreshToken, profile, cb) {
//   // Vérifiez si l'utilisateur existe déjà dans votre base de données
//   let user = await User.findOne({ googleId: profile.id });
//   if (user) {
//     // Si l'utilisateur existe, appelez le callback avec l'utilisateur
//     return cb(null, user);
//   }
//   // Sinon, créez un nouvel utilisateur et sauvegardez-le dans la base de données
//   user = new User({
//     googleId: profile.id,
//     role: 'user',
//     email: profile.emails[0].value,
//     date: Date.now(),
//     firstname: profile.name.givenName,
//     lastname: profile.name.familyName,
//     name: profile.displayName
//     // Ajoutez tous les autres champs que vous souhaitez enregistrer pour votre utilisateur
//   });
//   await user.save();
  
//   // Appelez le callback avec le nouvel utilisateur
//   cb(null, user);
// }).name('google'));