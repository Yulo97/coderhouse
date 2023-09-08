import EErrors from "../services/errors/enums.js";

export default (err, req, res, next) => {
    console.log(err.cause)
    switch (err.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.json({ status: "error", error: err.name })
            break;
        default:
            res.json({ status: "error", error: "hubo un error" })
    }
}