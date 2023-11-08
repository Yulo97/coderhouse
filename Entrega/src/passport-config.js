import passport from "passport";
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "./models/user.model.js";
import { passwordCompare, passwordEncrypt } from "./utils/password.js";
import config from "./config.js";
import CustomErrors from "./services/errors/CustomError.js";
import { generateUserInfo } from "./services/errors/info.js";
import EErrors from "./services/errors/enums.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await userModel.findOne({ email: username });

      if (!result) return done(null, false, { message: "Usuario no encontrado" });

      if (!passwordCompare(password, result.password))
        return done(null, false, { message: "Contraseña incorrecta" });

      return done(null, result);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body;

      if (!first_name || !last_name || !email) {
        try {
          CustomErrors.createError({
            name: "User creation error",
            cause: generateUserInfo({ first_name, last_name, email }),
            message: "Error trying to create User",
            code: EErrors.INVALID_TYPES_ERROR,
          });
        } catch (error) {
          console.error("Se produjo un error: ", error.message);
        }
      }

      try {
        const user = await userModel.findOne({ email: username });
        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          first_name,
          last_name,
          email,
          age,
          password: passwordEncrypt(password),
        };

        const result = await userModel.create(newUser);
        return done(null, result);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: config.passportIdGithub,
      clientSecret: config.passportClientSecretGithub,
      callbackURL: config.passportCallbackUrlGithub,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await userModel.findOne({ email: profile._json.email });
        if (user) return done(null, user);

        const newUser = await userModel.create({
          email: profile._json.email,
          first_name: profile._json.name,
          last_name: " ",
          age: 0,
          password: " ",
        });

        return done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

// serializacion
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializacion
passport.deserializeUser(async (id, done) => {
  try {
    const result = await userModel.findById(id);

    if (!result) return done(null, false, { message: "Usuario no encontrado" });

    done(null, result);
  } catch (error) {
    done(error);
  }
});

export default passport;
