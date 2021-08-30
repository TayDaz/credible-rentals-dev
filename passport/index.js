const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel = require("../db/model/user");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {
  SMS_OTP,
  EMAIL,
  INITIATED,
  LOCAL,
  FAILURE,
  ERROR,
} = require("../constants");

const signupMiddleware = (req, res, next) => {
  //
};

//signup
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      //if id is present that it means that the user is continuing the authentication process
      // and is already preauthenticated by facebook and hence save the remaining
      //fields in the database

      const {
        firstName,
        lastName,
        username,
        residenceAddress,
        mobileNumber,
        agreeToTerms,
        promotions,
      } = req.body;

      console.log("[passport.js] Passport signup", req.body);

      if (req.user ? req.user._id : false) {
        const _id = req.user_id._id;

        console.log("passport signup _id", _id);
        //if the _id is present then the user was authenticated after the 3rd party callback
        // and is partially logged or the user had already signed up
        let user;

        try {
          user = await UserModel.findById({ _id });
        } catch (err) {
          console.log(
            "[passport.js] login ERROR while searching for the _id in the database"
          );
          return done(err, null, "Error occurred in Database");
          // res.status(500).json({
          // 	status: ERROR,
          // 	message: "Error occurred in Database",
          // });
        }

        if (!user) {
          console.log(
            "[passport.js] signup _id did not match to the any of the users id in the database"
          );
          return done(new Error("unreachable url"), null, "unreachable url");
          // res.send(400).json({
          // 	status: FAILURE,
          // 	message: "unreachable url",
          // });
        } else {
          /*
						if user present then check if the signup status is in SMS_OTP or EMAIL already 
						then it need to be move down the controllers to the 
						sms or email routes
						*/

          if (user.signupStatus === INITIATED) {
            try {
              user = await UserModel.findByIdAndUpdate(
                { _id },
                {
                  residenceAddress,
                  mobileNumber,
                  agreeToTerms,
                  promotions,
                  signupStatus: SMS_OTP,
                },
                {
                  new: true,
                }
              );
            } catch (err) {
              console.log(
                `[passport.js] login ERROR occurred while updating user _id(${_id}) for initiated signupStatus`
              );
              return done(err, null);
              // res.send(400).json({
              // 	status: ERROR,
              // 	message: "Error while signing up",
              // 	error: {
              // 		err,
              // 	},
              // });
            }

            return done(null, user);
          } else if (
            user.signupStatus === SMS_OTP ||
            user.signupStatus === EMAIL
          ) {
            return done(null, user);
          } else {
            console.log(
              "[passport.js] login ERROR the signup status is not INITIATED, SMS_OTP, EMAIL and hence should not have triggered this route"
            );
            return done(new Error("Server error"), null);
            // res.status(400).json({
            // 	status: FAILURE,
            // 	message: "Incorrect url",
            // });
          }
        }
      } else {
        try {
          user = await UserModel.find({
            $or: [{ username }, { email }],
          });
        } catch (err) {
          console.log(
            `[passport.js] login ERROR while finding the user with username(${username}) and email(${email}) in the database`
          );
          return done(err, null);
          // res.status(500).json({
          // 	status: FAILURE,
          // 	message: "Server error",
          // });
        }
        //if the username email does not exist
        if (!user) {
          try {
            user = await UserModel.create({
              provider: LOCAL,
              firstName,
              lastName,
              username,
              email,
              password,
              residenceAddress,
              mobileNumber,
              agreeToTerms,
              promotions,
              signupStatus: SMS_OTP,
            });
          } catch (err) {
            console.log(
              "[passport.js] login ERROR occurred while pushing the new local user data in the database"
            );
            return done(err, null);
            // res.status(500).json({
            // 	status: ERROR,
            // 	message: "Error occurred while pushing data to DB",
            // });
          }
          return done(err, user);
        } else {
          console.log(
            `[passport.js] local user with that username(${username}) or email(${email}) or mobileNumber(${mobileNumber})was already present and hence did not get pushed to the database. This happend with after the validations`
          );
          res.status(400).json({
            status: ERROR,
            message: "User already exists. Please change the user's details",
          });
        }
      }
    }
  )
);

//login
// passport.use(
// 	"login",
// 	new localStrategy(
// 		{
// 			usernameField: "email",
// 			passwordField: "password",
// 			passReqToCallback: true,
// 		},
// 		async (req, email, password, done) => {
// 			try {
// 				let user;

// 				try{

// 				} catch( err) {
// 					console.log("[passport.js] login ERROR occurred while searching for the user with username or email", err);
// 					res.
// 				}
// 				const user = await UserModel.findOne({{ email });

// 				if (!user) {
// 					return done(null, false, { message: "User not found" });
// 				}

// 				const validate = await user.isValidPassword(password);

// 				if (!validate) {
// 					return done(null, false, { message: "Wrong Password" });
// 				}

// 				return done(null, user, { message: "Logged in Successfully" });
// 			} catch (error) {
// 				return done(error);
// 			}
// 		}
// 	)
// );

//JWT strategy
const jwtStrategyOpts = {
  secretOrKey: "TOP_SECRET",
  jwtFromRequest: ExtractJWT.fromHeader("token"),
};

passport.use(
  new JWTstrategy(jwtStrategyOpts, async (token, done) => {
    try {
      return done(null, token);
    } catch (error) {
      done(error);
    }
  })
);

//Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_LOGIN_APP_ID,
      clientSecret: process.env.FACEBOOK_LOGIN_APP_SECRET,
      callbackURL: process.env.FACEBOOK_LOGIN_CALLBACK_URL,
      profileFields: [
        "id",
        "first_name",
        "last_name",
        "picture",
        "email",
        "permissions",
      ],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const {
        id: username,
        first_name: firstName,
        last_name: lastName,
        email,
        picture: {
          data: { url: avatar },
        },
      } = profile._json;

      const { provider } = profile;

      let user;
      try {
        user = await UserModel.findOneAndUpdate(
          { username },
          {
            firstName,
            lastName,
            avatar,
            accessToken,
            refreshToken,
          },
          { new: true }
        );
      } catch (err) {
        console.log(
          "[passport.js] facebook callback ERROR while saving data to database",
          err
        );
        return cb(err, null);
      }

      //user is relogging
      if (user) {
        //if the user has updated any of its fields then update the same
        return cb(null, user);
      }

      //Create a new user
      try {
        user = await UserModel.create({
          firstName,
          lastName,
          username,
          email,
          avatar,
          accessToken,
          refreshToken,
          provider,
        });
      } catch (err) {
        console.log(
          "[passport.js] facebook callback ERROR while saving the data in the database",
          err
        );
        return cb(err, null);
      }

      return cb(null, user);
    }
  )
);

//Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID_DEV,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_DEV,
      callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL,
      profileFields: [
        "id",
        "first_name",
        "last_name",
        "picture",
        "email",
        "permissions",
      ],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken, profile);
      // res.send({accessToken, refreshToken, profile});
      const {
        sub: username,
        given_name: firstName,
        family_name: lastName,
        email,
        picture: avatar,
        email_verifed,
      } = profile._json;

      const { provider } = profile;

      let user;

      if (!email) {
        //send the response as email not found
        //later will be changed to request a callback to request the details again
        console.log(
          "[passport.js] GoogleStrategy ERROR email not returned from Google"
        );
        //the next controller will decide to redirect the user and again ask for permissions
        return cb(null, user);
      }

      const userEmailExists = await UserModel.findOne({ email }).catch(
        (err) => {
          console.log(
            "[passport.js] GoogleStrategy ERROR returned while searching for email in DB",
            err
          );

          //this will redirect
          return res.status(500).json({
            status: FAILURE,
            message: "ERROR returned while searching for email in DB",
          });
        }
      );

      if (!userEmailExists) {
        //Create a new user
        user = await UserModel.create({
          firstName,
          lastName,
          username,
          email,
          avatar,
          accessToken,
          refreshToken,
          provider,
        }).catch((err) => {
          console.log(
            "[passport.js] google callback ERROR while saving the data in the database",
            err
          );
          return cb(err, null);
        });

        return cb(null, user);
      }

      if (userEmailExists.username !== username) {
        //check if the username i.e. the google user id is same or not
        //if the username is not same then error
        console.log(
          "[passport.js] GoogleStrategy ERROR useremail is already registered. Please unlink the previous authenticator"
        );
        return cb(
          new Error("email is already registered to another userid"),
          null
        );
      }

      //update the user details and sent it further down the controller
      user = await UserModel.findOneAndUpdate(
        { username },
        {
          firstName,
          lastName,
          accessToken,
          refreshToken,
        },
        { new: true }
      ).catch((err) => {
        console.log(
          "[passport.js] google callback ERROR while saving data to database",
          err
        );
        return cb(err, null);
      });

      //user is relogging
      if (user) {
        //if the user has updated any of its fields then update the same
        return cb(null, user);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

//Twitter strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: process.env.TWITTER_LOGIN_CALLBACK_URL,
      includeEmail: true,
      profileFields: [
        "id",
        "first_name",
        "last_name",
        "picture",
        "email",
        "permissions",
      ],
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken, profile);
      // res.send({accessToken, refreshToken, profile});
      const {
        id_str: username,
        name,
        email,
        picture: avatar,
        email_verifed,
      } = profile._json;

      const { provider } = profile;
      const firstName = name.split(" ")[0],
        lastName = name.split(" ")[1];

      let user;

      if (!email) {
        //send the response as email not found
        //later will be changed to request a callback to request the details again
        console.log(
          "[passport.js] GoogleStrategy ERROR email not returned from Google"
        );
        //the next controller will decide to redirect the user and again ask for permissions
        return cb(null, user);
      }

      const userEmailExists = await UserModel.findOne({ email }).catch(
        (err) => {
          console.log(
            "[passport.js] GoogleStrategy ERROR returned while searching for email in DB",
            err
          );

          //this will redirect
          return res.status(500).json({
            status: FAILURE,
            message: "ERROR returned while searching for email in DB",
          });
        }
      );

      if (!userEmailExists) {
        //Create a new user
        user = await UserModel.create({
          firstName,
          lastName,
          username,
          email,
          avatar,
          accessToken,
          refreshToken,
          provider,
        }).catch((err) => {
          console.log(
            "[passport.js] google callback ERROR while saving the data in the database",
            err
          );
          return cb(err, null);
        });

        return cb(null, user);
      }

      if (userEmailExists.username !== username) {
        //check if the username i.e. the google user id is same or not
        //if the username is not same then error
        console.log(
          "[passport.js] GoogleStrategy ERROR useremail is already registered. Please unlink the previous authenticator"
        );
        return cb(
          new Error("email is already registered to another userid"),
          null
        );
      }

      //update the user details and sent it further down the controller
      user = await UserModel.findOneAndUpdate(
        { username },
        {
          firstName,
          lastName,
          accessToken,
          refreshToken,
        },
        { new: true }
      ).catch((err) => {
        console.log(
          "[passport.js] google callback ERROR while saving data to database",
          err
        );
        return cb(err, null);
      });

      //user is relogging
      if (user) {
        //if the user has updated any of its fields then update the same
        return cb(null, user);
      }
    }
  )
);
