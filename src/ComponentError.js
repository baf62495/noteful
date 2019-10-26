import React from 'react';

export default class ComponentError extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(err) {
		return { hasError: true }
	}

	render() {
		if (this.state.hasError) {
			return (
				<h2>Sorry, we're currently having issues displaying this information</h2>
			)
		}
		return this.props.children;
	}
}