export const generateUserInfo = user => {
    return `Una o mas propiedades en el usuario estan incompleta.
    Lista requerida de las propiedades:
    * firts_name : debe ser un String, ingresaste: ${user.first_name}*
    * last_name : debe ser un String, ingresaste: ${user.last_name}*
    * email : debe ser un String, ingresaste: ${user.email}*
    `
}