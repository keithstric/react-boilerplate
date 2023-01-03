import {ReactElement} from 'react';
import {Outlet} from 'react-router';
import './layout.scss';

interface SiteContainerProps {
	header?: ReactElement;
	footer?: ReactElement;
	sidebar?: ReactElement;
	children?: any
}
export const Layout = (props: SiteContainerProps) => {
	return (
		<div className="site-container flex-row">
			{props.sidebar &&
				<div className="site-sidebar">{props.sidebar}</div>
			}
			<div className="site-right-content">
				<div className="site-header">{props.header}</div>
				<div className={`site-content ${props.footer ? 'with-footer' : ''}`}>
					<Outlet />
				</div>
				{props.footer &&
					<div className="site-footer">{props.footer}</div>
				}
			</div>
		</div>
	);
};

export default Layout;
