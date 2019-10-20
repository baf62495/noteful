import React from 'react';
import './NotePageNav.css';

export default function NotePageNav(props) {
	return (
		<div className='NotePageNav'>
			<button
				tag='button'
				role='link'
				onClick={() => props.history.goBack()}
				className='NotePageNav__back'
			>
				Go back
			</button>
		</div>
	)
}