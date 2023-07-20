import passport from "passport"
import LocalStrategy from "passport-local"
import userModel from "./dao/models/user.model.js"

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const result = await userModel.findOne({ email: username })

        if (!result) return done(null, false, { message: "Usuario no encontrado" })

        if (result.password !== password) return done(null, false, { message: "Contraseña incorrecta" })

        return done(null, result)

    } catch (error) {
        done(error)
    }
}))

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
