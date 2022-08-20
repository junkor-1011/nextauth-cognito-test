/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

type LogLevelLower = 'Error' | 'Warning' | 'Info' | 'Debug';
type LogLevelNumber = 0 | 1 | 2 | 3;

/**
 * Logger Class(TMP)
 */
export default class Logger {
  logLevelLower: LogLevelLower;

  logLevelNumber: LogLevelNumber;

  constructor(logLevelLower?: string) {
    // this.logLevelLower = logLevelLower;
    switch (logLevelLower) {
      case 'Debug': {
        this.logLevelLower = logLevelLower;
        this.logLevelNumber = 0;
        break;
      }
      case 'Info': {
        this.logLevelLower = logLevelLower;
        this.logLevelNumber = 1;
        break;
      }
      case 'Warning': {
        this.logLevelLower = logLevelLower;
        this.logLevelNumber = 2;
        break;
      }
      case 'Error': {
        this.logLevelLower = logLevelLower;
        this.logLevelNumber = 3;
        break;
      }
      default: {
        this.logLevelLower = 'Info';
        this.logLevelNumber = 1;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  log(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }

  // eslint-disable-next-line class-methods-use-this
  error(message: any, ...optionalParams: any[]) {
    if (this.logLevelNumber <= 3) console.error('[ERROR]', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.logLevelNumber <= 2) console.warn('[WARNING]', message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    if (this.logLevelNumber <= 1) console.info('[INFO]', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    if (this.logLevelNumber <= 0) console.debug('[DEBUG]', message, ...optionalParams);
  }
}
