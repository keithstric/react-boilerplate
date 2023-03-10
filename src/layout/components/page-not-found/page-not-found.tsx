import SiteFooter from '@layout/components/site-footer/site-footer';
import SiteHeader from '@layout/components/site-header/site-header';
import Layout from '@layout/components/layout/layout';

import './page-not-found.scss';

export const PageNotFound = () => {
	return (
		<Layout
			header={<SiteHeader title="React Boilerplate" />}
			footer={<SiteFooter />}>
			<div className="page-container flex-column flex-content-center">
				<h1>404</h1>
				<h2>Page Not Found</h2>
			</div>
		</Layout>
	);
};

export default PageNotFound;
