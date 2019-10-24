import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddNote extends React.Component {
	constructor(props) {
		super(props);
		this.nameInput = React.createRef();
		this.contentInput = React.createRef();
		this.folderSelect = React.createRef();
	}
	static defaultProps = {
		history: {
			push: () => {}
		}
	}

	static contextType = ApiContext;

	handleSubmit = e => {
		e.preventDefault();

		const newNote = {
			name: this.nameInput.current.value,
			content: this.contentInput.current.value,
			folderId: this.folderSelect.current.value,
			modified: new Date()
		}

		fetch(`${config.API_ENDPOINT}/notes`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(newNote)
		})
			.then(res => {
				if(!res.ok) {
					return res.json().then(e => Promise.reject(e))
				}
				return res.json()
			})
			.then(note => {
				this.context.addNote(note)
				this.props.history.push(`/folder/${note.folderId}`)
			})
			.catch(err => {
				console.error({ err })
			})
	}

	render() {
		const { folders=[] } = this.context;
		return (
			<section className='AddNote'>
				<h2>Create a note</h2>
				<form className='note__form' onSubmit={e => this.handleSubmit(e)}>
					<div className='note__form-field'>
						<label htmlFor='note-name-input'>
							Name
						</label>
						<input
							type='text'
							id='note-name-input'
							name='note-name'
							ref={this.nameInput}
							required
						/>
					</div>
					<div className='note__form-field'>
						<label htmlFor='note-content-input'>
							Content
						</label>
						<textarea
							id='note-content-input'
							name='note-content'
							ref={this.contentInput}
						/>
					</div>
					<div className='note__form-field'>
						<label htmlFor='note-folder-select'>
							Folder
						</label>
							<select id='note-folder-select' name='note-folder-id' ref={this.folderSelect}>
								<option value={null}>Choose a folder</option>
								{folders.map(folder =>
									<option key={folder.id} value={folder.id}>
										{folder.name}
									</option>
								)}
							</select>
					</div>
					<button type='submit' className='btn AddNote__btn'>
						Add Note
					</button>
				</form>
			</section>
		)
	}
}
