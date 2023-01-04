import Layout from '@layout/components/layout/layout';
import SiteFooter from '@layout/components/site-footer/site-footer';
import SiteHeader from '@layout/components/site-header/site-header';
import React from 'react';

export const Features = () => {
	return (
		<Layout
			header={<SiteHeader title="React Boilerplate" />}
			footer={<SiteFooter />}>
			<div className="features-container">
				Features Page
			</div>
		</Layout>
	);
};
export default Features;
