import './site-header.scss';

interface SiteHeaderProps {
	title: string;
}

export const SiteHeader = (props: SiteHeaderProps) => {
	return (
		<div className="site-header-container flex-row">
			<a href="/" className="title">{props.title}</a>
			<span className="spacer"></span>
			<a href="/about" className="header-link">About</a>
			<a href="/features" className="header-link">Features</a>
			<a href="https://github.com/keithstric/react-boilerplate" className="header-link" target="_blank">Repository</a>
		</div>
	);
};

export default SiteHeader;
