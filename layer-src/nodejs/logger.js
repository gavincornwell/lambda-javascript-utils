"use strict";

class Logger {
  constructor() {
    this.LogLevel = {
      ERROR: 1,
      WARN: 2,
      INFO: 3,
      DEBUG: 4,
    };

    if (process.env.LOG_LEVEL) {
      switch (process.env.LOG_LEVEL) {
        case "ERROR":
          this.internalLogLevel = this.LogLevel.ERROR;
          break;
        case "WARN":
          this.internalLogLevel = this.LogLevel.WARN;
          break;
        case "INFO":
          this.internalLogLevel = this.LogLevel.INFO;
          break;
        case "DEBUG":
          this.internalLogLevel = this.LogLevel.DEBUG;
          break;
        default:
          this.internalLogLevel = process.env.LOG_LEVEL;
          break;
      }
    } else {
      this.internalLogLevel = this.LogLevel.INFO;
    }
  }

  setLogLevel(level) {
    this.internalLogLevel = level;
  }

  error(error) {
    if (typeof error == "string") {
      console.log(`ERROR ${error}`);
    } else {
      console.log(`ERROR ${error.message}`);
    }
  }

  warn(message) {
    if (this.internalLogLevel >= this.LogLevel.WARN) {
      console.log(`WARN ${message}`);
    }
  }

  info(message) {
    if (this.internalLogLevel >= this.LogLevel.INFO) {
      console.log(`INFO ${message}`);
    }
  }

  debug(message) {
    if (this.internalLogLevel >= this.LogLevel.DEBUG) {
      console.log(`DEBUG ${message}`);
    }
  }
}

module.exports = Object.freeze(Logger);

