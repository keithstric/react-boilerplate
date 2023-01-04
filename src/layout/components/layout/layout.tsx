import {ReactElement} from 'react';
import './layout.scss';

interface SiteContainerProps {
	header?: ReactElement;
	footer?: ReactElement;
	sidebar?: ReactElement;
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	children?: any
}


export const Layout = (props: SiteContainerProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	return (
		<div className="site-container flex-row">
			{props.sidebar &&
				<div className="site-sidebar">{props.sidebar}</div>
			}
			<div className="site-right-content">
				<div className="site-header">{props.header}</div>
				<div className={`site-content ${props.footer ? 'with-footer' : ''}`}>
					{props.children}
				</div>
				{props.footer &&
					<div className="site-footer">{props.footer}</div>
				}
			</div>
		</div>
	);
};

export default Layout;
