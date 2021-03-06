import React from 'react';
import './NoteListMain.css';
import Note from '../Note/Note';
import AddNoteButton from '../AddNoteButton/AddNoteButton';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';

export default class NoteListMain extends React.Component {
	static defaultProps = {
		match: {
			params: {}
		}
	}

	static contextType = ApiContext;

	getNotesForFolder = (notes=[], folderId) => (
		(!folderId)
			? notes
			: notes.filter(note => note.folder_id == folderId)
	)

	render() {
		const { folderId } = this.props.match.params
		const { notes=[] } = this.context
		const notesForFolder = this.getNotesForFolder(
                                notes,
                                folderId
                            );
		return (
			<section className='NoteListMain'>
				<ul>
					{notesForFolder.map(note =>
						<li key={note.id}>
							<Note
								id={note.id}
								name={note.note_name}
								modified={note.modified}
							/>
						</li>
					)}
				</ul>
				<AddNoteButton />
			</section>
		)
	}
}

NoteListMain.propType = {
	math: PropTypes.object.isRequired
}