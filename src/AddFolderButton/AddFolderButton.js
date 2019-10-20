import React from 'react';
import './AddFolderButton.css';
import { Link } from 'react-router-dom';

export default function AddNoteButton() {
	return (
		<Link to='/add-folder'>
			<button className='btn NoteListNav__btn'>
				Add folder
			</button>
		</Link>
	)
}