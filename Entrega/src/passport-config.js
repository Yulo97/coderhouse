import passport from "passport"
import LocalStrategy from "passport-local"
import GitHubStrategy from "passport-github2"
import userModel from "./dao/models/user.model.js"
import { passwordCompare, passwordEncrypt } from "./utils/password.js"

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const result = await userModel.findOne({ email: username })

        if (!result) return done(null, false, { message: "Usuario no encontrado" })

        if (!passwordCompare(password, result.password)) return done(null, false, { message: "Contraseña incorrecta" })

        return done(null, result)
    } catch (error) {
        done(error)
    }
}))

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
}, async (req, username, password, done) => {
    const { first_name, last_name, email, age } = req.body
    try {
        const user = await userModel.findOne({ email: username })
        if (user) {
            console.log('User already exists')
            return done(null, false)
        }

        const newUser = {
            first_name, last_name, email, age, password: passwordEncrypt(password)
        }

        const result = await userModel.create(newUser)
        return done(null, result)
    } catch (error) {
        return done(error)
    }
}))

passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.79f77acb575ae46e',
    clientSecret: "5d16eb139e7e1f5663469c33868400822db44565",
    callbackURL: "http://localhost:8080/api/user/callbackgithub"

}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userModel.findOne({ email: profile._json.email })
        if (user) return done(null, user)

        const newUser = await userModel.create({
            email: profile._json.email,
            first_name: profile._json.name,
            last_name: " ",
            age: 0,
            password: " "
        })

        return done(null, newUser)
    } catch (error) {
        done(error)
    }
}
));

// serializacion
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// deserializacion
passport.deserializeUser(async (id, done) => {
    try {
        const result = await userModel.findById(id)

        if (!result) return done(null, false, { message: "Usuario no encontrado" })

        done(null, result)
    } catch (error) {
        done(error);
    }
})

export default passport;
