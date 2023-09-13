import winston from "winston"
import config from "../config.js"

winston.addColors({
    debug: "white",
    http: "green",
    info: "blue",
    warning: "yellow",
    error: "red",
    fatal: "red"
})

export const logger = winston.createLogger({
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    transports: [
        config.enviroment != "produccion" ? new winston.transports.Console({
            level: "fatal",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        }) :
            new winston.transports.File({
                level: "fatal",
                filename: "./logs/serverlogs.log",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.simple()
                )
            })
    ]
})