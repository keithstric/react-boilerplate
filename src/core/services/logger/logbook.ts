/* eslint-disable  @typescript-eslint/no-explicit-any */
import {LogEntry} from './log-entry';
import {LogBookConfig, LogLevel} from './logger.interface';

export class LogBook {
	static instance: LogBook | null = null;
	private readonly _config: LogBookConfig = {
		transports: [],
		logLevel: LogLevel.info,
	};

	constructor(config: LogBookConfig) {
		this._config = {
			...this._config,
			...config,
		};
	}

	static getInstance(config?: LogBookConfig) {
		if (!LogBook.instance && config) {
			LogBook.instance = new LogBook(config);
		}
		return LogBook.instance;
	}

	get config() {
		return this._config;
	}

	get transports() {
		return this.config.transports;
	}

	set transports(transports) {
		this._config.transports = transports;
	}

	get logLevel() {
		return this.config.logLevel;
	}

	set logLevel(logLevel: LogLevel) {
		this._config.logLevel = logLevel;
	}

	error(message: string, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.error, message, optionalParams);
	}

	warn(message: string, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.warn, message, optionalParams);
	}

	info(message: string, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.info, message, optionalParams);
	}

	verbose(message: string, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.verbose, message, optionalParams);
	}

	debug(message: string, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.debug, message, optionalParams);
	}

	silly(message: string, ...optionalParams: any[]) {
		this.writeToLog(LogLevel.silly, message, optionalParams);
	}

	log(level: LogLevel, message: string, ...optionalParams: any[]) {
		this.writeToLog(level, message, optionalParams);
	}

	/**
	 * Send the log entry off to the transport. Will display or store the log entry
	 * @param {LogLevel} level
	 * @param {string} message
	 * @param {any[]} optionalParams
	 */
	writeToLog(level: LogLevel, message: string, ...optionalParams: any[]) {
		this.transports.forEach((transport) => {
			if (this.shouldLog(level)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				const logEntry = new LogEntry(level, message, ...optionalParams);
				logEntry.logWithDate = transport.logWithDate;
				transport.logMessage(logEntry);
			}
		});
	}

	shouldLog(level: LogLevel) {
		return level <= this.logLevel;
	}
}
