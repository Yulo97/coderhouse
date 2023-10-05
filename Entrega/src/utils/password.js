import bcrypt from "bcrypt"

const salt = 10;

export const passwordEncrypt = password => {
    const hashed = bcrypt.hashSync(password, salt);
    return hashed
}

export const passwordCompare = (password, hashed) => {
    const match = bcrypt.compareSync(password, hashed); // Compara una contraseña con un hash
    return match
}

export const passwordRestore = (password) => {
    const match = bcrypt.compareSync(password, hashed); // Compara una contraseña con un hash

    if(match) return {error: true, message: "No puedes usar la misma contraseña"}

    
}