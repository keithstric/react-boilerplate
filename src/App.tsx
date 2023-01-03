import Layout from '@layout/components/layout/layout';
import PageNotFound from '@layout/components/page-not-found/page-not-found';
import SiteFooter from '@layout/components/site-footer/site-footer';
import SiteHeader from '@layout/components/site-header/site-header';
import React from 'react';
import {Route, Routes} from 'react-router';

import './App.scss';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout
				header={<SiteHeader title="React Boilerplate" />}
				footer={<SiteFooter />}
			/>}>
				<Route path="*" element={<PageNotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
