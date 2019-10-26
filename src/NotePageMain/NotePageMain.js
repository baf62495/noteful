import React from 'react';
import './NotePageMain.css';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';

export default class NotePageMain extends React.Component {
	static defaultProps = {
		match: {
			params: {}
		}
	}

	static contextType = ApiContext;

	handleDeleteButton = noteId => {
		this.props.history.push('/')
	}

	findNote = (notes=[], noteId) => (
  		notes.find(note => note.id === noteId)
	)

	render() {
		const { notes=[] } = this.context
		const { noteId } = this.props.match.params
		const note = this.findNote(notes, noteId) || { content: ''}
		return (
			<section className='NotePageMain'>
				<Note
					id={note.id}
					name={note.name}
					modified={note.modified}
					onDeleteNote={this.handleDeleteButton}
				/>
				<div className='NotePageMain__content'>
					{note.content.split(/\n \r|\n/).map((para, i) =>
			          <p key={i}>{para}</p>
			        )}
				</div>
			</section>
		)
	}
}

NotePageMain.propType = {
	push: PropTypes.func.isRequired,
	params: PropTypes.array.isRequired
}