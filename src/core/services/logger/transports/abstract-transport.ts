/* eslint-disable  @typescript-eslint/no-explicit-any */
import {LogEntry} from '../log-entry';
import {FormattedMessage, LogLevel} from '../logger.interface';

export abstract class AbstractTransport {
	/**
	 * Set to true to include the date in the logging message
	 */
	abstract readonly logWithDate: boolean;

	protected constructor(public level: LogLevel) {}

	/**
	 * The name of this transport
	 */
	get name() {
		return this.constructor.name;
	}

	/**
	 * Show the log or commit it to a database. If you need to modify
	 * 'logWithDate', 'shouldPersist', 'shouldNotifyUser' on a per
	 * log message basis, do it here otherwise it'll use whatever is
	 * defined as those class member properties
	 *
	 * @param {LogEntry} logEntry
	 */
	protected abstract log(logEntry: LogEntry): LogEntry;

	/**
	 * This should be a custom formatter for the log message
	 * @param logEntry
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
	protected _formatMessage(logEntry: LogEntry): FormattedMessage | void {}

	/**
	 * Called from LoggerService to ensure that shouldNotifyUser, shouldPersist and
	 * logWithDate are properly set on the logEntry
	 * @param {LogEntry} logEntry
	 */
	public logMessage(logEntry: LogEntry): LogEntry {
		return this.log(logEntry);
	}
}
