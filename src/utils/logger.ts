import { dayFormat } from "./day_format";

export type LogLevel = "none" | "trace" | "debug" | "info" | "warn" | "error";

export class Logger {
    private static instance: Logger;

    private constructor() { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private log(level: LogLevel, message: string, ...args: any[]) {
        const msg = `${dayFormat(new Date(), "YYYY-MM-DD HH:mm:ss")} [${level}] ${message}`;
        switch (level) {
            case "error":
                console.error(msg, ...args);
                break;
            case "warn":
                console.warn(msg, ...args);
                break;
            case "trace":
                console.info(msg, ...args);
                break;
            default:
                console.info(msg, ...args);
                break;
        }
    }

    trace(message: string, ...args: any[]) {
        this.log("trace", message, ...args);
    }

    debug(message: string, ...args: any[]) {
        this.log("debug", message, ...args);
    }

    info(message: string, ...args: any[]) {
        this.log("info", message, ...args);
    }

    warn(message: string, ...args: any[]) {
        this.log("warn", message, ...args);
    }

    error(message: string, ...args: any[]) {
        this.log("error", message, ...args);
    }

}

export const logger = Logger.getInstance();