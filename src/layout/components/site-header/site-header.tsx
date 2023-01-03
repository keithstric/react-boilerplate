import './site-header.scss';

interface SiteHeaderProps {
	title: string;
}

export const SiteHeader = (props: SiteHeaderProps) => {
	return (
		<div className="site-header-container flex-row">
			<a href="/" className="title">{props.title}</a>
		</div>
	);
};

export default SiteHeader;
