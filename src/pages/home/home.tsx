import './home.scss';
import {ApiMethod} from '@core/interfaces/core.interface';
import HttpService from '@core/services/http/http.service';
import {LogBook} from '@core/services/logger/logbook';
import Layout from '@layout/components/layout/layout';
import SiteFooter from '@layout/components/site-footer/site-footer';
import SiteHeader from '@layout/components/site-header/site-header';
import ReactiveFormDemo from '@src/pages/home/components/ReactiveFormDemo';
import React from 'react';

export const Home = () => {
	const getPokeClick = async (evt: any) => {
		const httpService = HttpService.getInstance();
		const response = await httpService.doRequest('https://pokeapi.co/api/v2/pokemon', ApiMethod.GET);
		LogBook.getInstance()?.debug('[getPokeClick] response=', response);
	};

	return (
		<Layout
			header={<SiteHeader title="React Boilerplate" />}
			footer={<SiteFooter />}>
			<div className="home-container">
				<h3>Loading spinner and Cache demo</h3>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<button type="button" onClick={getPokeClick}>Get Pokemon</button>
				<h3>Reactive Form Demo</h3>
				<ReactiveFormDemo />
			</div>
		</Layout>
	);
};

export default Home;
