import './home.scss';
import {ApiMethod} from '@core/interfaces/core.interfaces';
import HttpService from '@core/services/http/http.service';
import Layout from '@layout/components/layout/layout';
import SiteFooter from '@layout/components/site-footer/site-footer';
import SiteHeader from '@layout/components/site-header/site-header';
import React from 'react';

export const Home = () => {
	const getPokeClick = async (evt: any) => {
		const httpService = HttpService.getInstance();
		const response = await httpService.doRequest('https://pokeapi.co/api/v2/pokemon', ApiMethod.GET);
		console.log('[getPokeClick] response=', response);
	};

	return (
		<Layout
			header={<SiteHeader title="React Boilerplate" />}
			footer={<SiteFooter />}>
			<div className="home-container">
				<h3>Loading spinner and Cache demo</h3>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<button type="button" onClick={getPokeClick}>Get Pokemon</button>
			</div>
		</Layout>
	);
};

export default Home;