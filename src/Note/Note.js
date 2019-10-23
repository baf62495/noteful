import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ApiContext from '../ApiContext';
import config from '../config'

export default class Note extends React.Component {
	static defaultProps = {
		onDeleteNote: () => {},
	}

	static contextType = ApiContext;

	handleClickDelete = e => {
		e.preventDefault();
		const noteId = this.props.id
		console.log(noteId)

		fetch(config.API_ENDPOINT + `/notes/${noteId}`, {
			method: 'DELETE',
			header: {
				'content-type': 'application/json'
			},
		})
			.then(res => {
				if (!res.ok)
					return res.json().the(e => Promise.reject(e))
				return res.json()
			})
			.then(() => {
				this.context.deleteNote(noteId)
				
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
						{format(new Date(modified), 'dd/MM/yyyy')}
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