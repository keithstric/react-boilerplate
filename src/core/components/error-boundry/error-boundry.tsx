import React, {ReactElement, ErrorInfo} from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
	errorMessage: string;
	error: Error | undefined;
	stack: string;
}
interface ErrorboundaryProps {
	children: ReactElement
}

export class ErrorBoundaries extends React.Component<ErrorboundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorboundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			errorMessage: '',
			error: undefined,
			stack: '',
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log('[ErrorBoundaries.componentDidCatch] errorInfo=', errorInfo);
		this.setState({hasError: true});
		this.setState({errorMessage: error.message});
		this.setState({error: error});
		this.setState({stack: errorInfo.componentStack});
	}

	render(): React.ReactNode {
		console.log('[ErrorBoundaries.render], this.state=', this.state);
		if (this.state?.hasError) {
			return (
				<div className="error-container">
					<h3>ErrorBoundaries</h3>
					{this.state.errorMessage}
					<pre>
						{this.state.stack}
					</pre>
				</div>
			);
		}
		return (this.props.children);
	}
}
