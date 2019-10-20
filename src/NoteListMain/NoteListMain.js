import React from 'react';
import './NoteListMain.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import AddNoteButton from '../AddNoteButton/AddNoteButton';

export default function NoteListMain(props) {
	return (
		<section className='NoteListMain'>
			<ul>
				{props.notes.map(note =>
					<li key={note.id}>
						<Note
							id={note.id}
							name={note.name}
							modified={note.modified}
						/>
					</li>
				)}
			</ul>
			<AddNoteButton />
		</section>
	)
}

NoteListMain.defaultProps = {
	notes: []
}