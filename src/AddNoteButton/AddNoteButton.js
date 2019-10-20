import React from 'react';
import './AddNoteButton.css';
import { Link } from 'react-router-dom';

export default function AddNoteButton() {
	return (
		<Link to='/add-note'>
			<button className='btn NoteListMain__btn'>
				Add note
			</button>
		</Link>
	)
}