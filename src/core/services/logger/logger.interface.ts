/* eslint-disable  @typescript-eslint/no-explicit-any */
import {AbstractTransport} from './transports/abstract-transport';

export enum LogLevel {
	error,
	warn,
	info,
	verbose,
	debug,
	silly
}

export const LogLevelNameMap = [
	'error',
	'warn',
	'info',
	'verbose',
	'debug',
	'silly',
];

export interface LogBookConfig {
	transports: AbstractTransport[];
	logLevel: LogLevel;
}

export interface FormattedMessage {
	message: string;
	/**
	 * We use an `qny` type because this can contain whatever may be passed
	 * into a log message as additional options and style information for those options.
	 * For example:
	 * `Logger.info('foo', bar)`
	 *
	 * Here we don't know what `bar` is and it will be in the replacementVars array.
	 * So it really could be anything
	 */
	replacementVars: any[];
}

export const logLevelColors: string[] = [
	'color: #de1414;',
	'color: #fff3cd;',
	'color: #d1ecf1;',
	'color: #856404;',
	'color: #d4edda;',
	'color: #f8d7da;',
];

export const terminalLevelColors: string[] = [
	'\x1b[31m',
	'\x1b[33m',
	'\x1b[36m',
	'\x1b[35m',
	'\x1b[32m',
	'\x1b[37m',
];

export const terminalColors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',
	fgBlack: '\x1b[30m',
	fgRed: '\x1b[31m',
	fgGreen: '\x1b[32m',
	fgYellow: '\x1b[33m',
	fgBlue: '\x1b[34m',
	fgMagenta: '\x1b[35m',
	fgCyan: '\x1b[36m',
	fgWhite: '\x1b[37m',
	bgBlack: '\x1b[40m',
	bgRed: '\x1b[41m',
	bgGreen: '\x1b[42m',
	bgYellow: '\x1b[43m',
	bgBlue: '\x1b[44m',
	bgMagenta: '\x1b[45m',
	bgCyan: '\x1b[46m',
	bgWhite: '\x1b[47m',
};
