import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';

export default class Note extends React.Component {
	static defaultProps = {
		onDeleteNote: () => {},
	}

	static contextType = ApiContext;

	handleClickDelete = e => {
		e.preventDefault();
		const noteId = this.props.id

		fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
			method: 'DELETE',
			header: {
				'content-type': 'application/json'
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e))
				}
				return res.json()
			})
			.then(() => {
				this.context.deleteNote(noteId)
				this.props.onDeleteNote(noteId)
			})
			.catch(error => {
				console.error({ error })
			})
	}

	render() {
		const { name, id, modified } = this.props;
		return (
			<div className='note'>
				<h2 className='Note__title'>
					<Link to={`/note/${id}`}>
						{name}
					</Link>
				</h2>
				<div className='Note__modified'>
					Last modified on {' '}
					<span className='date'>
						{modified}
					</span>
				</div>
				<button
					className='Note__delete-btn'
					onClick={this.handleClickDelete}
				>
					Delete
				</button>
			</div>
		)
	}
}

Note.propTypes = {
	onDeleteNote: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	modified: PropTypes.string
}