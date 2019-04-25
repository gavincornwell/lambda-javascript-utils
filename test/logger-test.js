const logger = new (require("../logger.js"))();

console.log("current log level: " + logger.internalLogLevel);

logger.error(new Error("This is an error message"));
logger.warn("This is an warn message");
logger.info("This is an info message");
logger.debug("This is an debug message");

console.log("setting log level to ERROR...");
logger.setLogLevel(logger.LogLevel.ERROR);
console.log("current log level: " + logger.internalLogLevel);

logger.error(new Error("This is an error message"));
logger.warn("This is an warn message");
logger.info("This is an info message");
logger.debug("This is an debug message");