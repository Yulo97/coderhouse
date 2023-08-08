import bcrypt from "bcrypt"

const salt = 10;

export const passwordEncrypt = password => {
    const hashed = bcrypt.hashSync(password, salt);
    return hashed
}

export const passwordCompare = (password, hashed) => {
    const match = bcrypt.compareSync(password, hashed); // Compara una contraseña con un hash
    console.log(match)
    return match
}
