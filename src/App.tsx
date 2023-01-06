import {LogBook} from '@core/services/logger/logbook';
import {LogBookConfig, LogLevel} from '@core/services/logger/logger.interface';
import {ConsoleTransport} from '@core/services/logger/transports/console-transport';
import PageNotFound from '@layout/components/page-not-found/page-not-found';
import About from '@src/pages/about/about';
import Features from '@src/pages/features/features';
import Home from '@src/pages/home/home';
import React, {createContext, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router';

import './App.scss';

const loggerConfig: LogBookConfig = {
	transports: [new ConsoleTransport(LogLevel.debug, true)],
	logLevel: LogLevel.debug,
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const LoggerContext = createContext<LogBook | undefined | null>(undefined);
export const logger = LogBook.getInstance(loggerConfig);

export const App = () => {
	const [loading, setLoading] = useState(false);
	const loadingHandler = (evt: CustomEvent) => {
		logger?.silly('[App.loadingHandler], evt.detail=', evt.detail);
		setLoading(evt.detail as boolean);
	};
	useEffect(() => {
		document.addEventListener('loadingUpdated', loadingHandler);
		return () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			document.removeEventListener('loadingUpdated', loadingHandler);
		};
	}, []);
	logger?.silly('[App.state] loading=', loading);
	return (
		<LoggerContext.Provider value={logger}>
			{loading &&
				<div className="loading-container flex flex-content-center">
					<svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
						<circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
					</svg>
				</div>
			}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="features" element={<Features />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</LoggerContext.Provider>
	);
};

export default App;
