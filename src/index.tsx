import {ErrorBoundaries} from '@core/components/error-boundry/error-boundry';
import {setupRequestInterceptor, setupResponseInterceptor} from '@core/interceptors/http-interceptor.service';
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import reportWebVitals from './reportWebVitals';

import './scss/styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

setupRequestInterceptor();
setupResponseInterceptor();
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ErrorBoundaries>
				<App />
			</ErrorBoundaries>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
