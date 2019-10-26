import React from 'react';
import './NotePageNav.css';
import PropTypes from 'prop-types';


export default class NotePageNav extends React.Component {
	static defaultProps = {
		history: {
			goBack: () => {}
		},
		match: {
			params: {}
		}
	}

	render() {
		return (
			<div className='NotePageNav'>
				<button
					tag='button'
					role='link'
					onClick={() => this.props.history.goBack()}
					className='NotePageNav__back'
				>
					Go back
				</button>
			</div>
		)
	}
}

NotePageNav.propType = {
	push: PropTypes.func.isRequired
}