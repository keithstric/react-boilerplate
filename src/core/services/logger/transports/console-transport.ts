/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
	FormattedMessage,
	LogLevel,
	logLevelColors,
	LogLevelNameMap,
	terminalColors,
	terminalLevelColors,
} from '../logger.interface';
import {LogEntry} from '../log-entry';
import {AbstractTransport} from './abstract-transport';

export class ConsoleTransport extends AbstractTransport {
	readonly logWithDate: boolean;
	/**
	 * The index of these colors should match the log level enum.
	 * For example, LogLevel.error = 0. So color at index 0 will be
	 * used for log entries with an Error logging level
	 */
	logLevelColors: string[] = logLevelColors;
	terminalLevelColors: string[] = terminalLevelColors;

	constructor(level: LogLevel, logWithDate: boolean) {
		super(level);
		this.logWithDate = logWithDate;
	}

	/**
	 * If this module is running in a node instance, then return true
	 * otherwise return false
	 */
	get isTerminal() {
		try {
			return !window;
		} catch (e) {
			return true;
		}
	}

	/**
	 * Get all the different log parts for styling purposes
	 * @param {LogEntry} logEntry
	 * @private
	 */
	private _getLogParts(logEntry: LogEntry) {
		if (this.isTerminal) {
			return this._getTerminalLogParts(logEntry);
		} else {
			return this._getUiLogParts(logEntry);
		}
	}

	private _getUiLogParts(logEntry: LogEntry) {
		const levelColor = this.logLevelColors[logEntry.level];
		return [
			{partName: 'date', styles: 'color: default;', value: `%c${logEntry.entryDate} - `},
			{
				partName: 'level',
				styles: `${levelColor} font-weight: bold; font-size: 1.1em`,
				value: `%c${LogLevelNameMap[logEntry.level]} - `,
			},
			{partName: 'message', styles: levelColor, value: `%c${logEntry.message}`},
		];
	}

	private _getTerminalLogParts(logEntry: LogEntry) {
		const levelColor = this.terminalLevelColors[logEntry.level];
		return [
			{partName: 'date', styles: terminalColors.reset, value: `${logEntry.entryDate} -`},
			{partName: 'level', styles: levelColor, value: `${LogLevelNameMap[logEntry.level]} -`},
			{partName: 'message', styles: levelColor, value: `${logEntry.message}`},
		];
	}

	/**
	 * Add formatting to the message to be displayed
	 * @param logEntry
	 * @returns {FormattedMessage}
	 */
	protected _formatUiMessage(logEntry: LogEntry): FormattedMessage {
		let message = '';
		const logParts = this._getLogParts(logEntry);
		const replacementVars: string[] = [];
		logParts.forEach((logPart) => {
			if (logPart.partName !== 'date' || (logPart.partName === 'date' && logEntry.logWithDate)) {
				message += logPart.value;
				replacementVars.push(logPart.styles);
			}
		});
		return {message, replacementVars};
	}

	protected log(logEntry: LogEntry): LogEntry {
		if (!this.isTerminal) {
			return this._logToUiConsole(logEntry);
		} else {
			return this._logTerminal(logEntry);
		}
	}

	private _logToUiConsole(logEntry: LogEntry) {
		const formatMsg = this._formatUiMessage(logEntry);
		let message = formatMsg.message;
		let vars = formatMsg.replacementVars;
		if (logEntry.params && logEntry.params.length) {
			message += ' %o';
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			vars = [...formatMsg.replacementVars, ...logEntry.params];
		}
		// Send message to console
		const consoleFunc = logEntry.level > 0 ? console.log : console.error;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		consoleFunc(message, ...vars);
		return logEntry;
	}

	private _logTerminal(logEntry: LogEntry): LogEntry {
		const logParts = this._getLogParts(logEntry);
		const consoleParts: any[] = [];
		logParts.forEach((logPart) => {
			consoleParts.push(logPart.styles);
			consoleParts.push(logPart.value);
		});
		consoleParts.push(terminalColors.reset);
		logEntry.params?.forEach((param) => {
			consoleParts.push(param);
		});
		const consoleFunc = logEntry.level > 0 ? console.log : console.error;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		consoleFunc(...consoleParts);
		return logEntry;
	}
}
