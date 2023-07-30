import bcrypt from "bcrypt"

const salt = bcrypt.genSaltSync();

export const passwordEncrypt = password => {
    const hashed = bcrypt.hashSync(password, salt);
    return hashed
}