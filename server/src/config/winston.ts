import * as winston from "winston";
import appRoot from "app-root-path";

const options = {
  file: {
    level: "info",
    filename: `${appRoot.path}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

export class LoggerStream {
  public write(message: string) {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  }
}
