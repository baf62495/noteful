import React from 'react';
import './AddFolder.css';
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';

export default class AddFolder extends React.Component {
	constructor(props) {
		super(props);
		this.folderName = React.createRef();
	}

	static defaultProps = {
		history: {
			push: () => {}
		}
	}

	static contextType = ApiContext;

	handleSubmit = e => {
		e.preventDefault();

		const newFolder = {
			folder_name: this.folderName.current.value
		}

		fetch(`${config.API_ENDPOINT}/folders`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(newFolder)
		})
			.then(res => {
				if(!res.ok) {
					return res.json().then(e => Promise.reject(e))
				}
				return res.json()
			})
			.then(folder => {
				this.context.addFolder(folder)
				this.props.history.push(`/folder/${folder.id}`)
			})
			.catch(err => {
				console.error({ err })
			})
	}

	render() {
		return (
			<section className='AddNote'>
				<h2>Create a note</h2>
				<form className='note__form' onSubmit={e => this.handleSubmit(e)}>
					<div className='note__form-field'>
						<label htmlFor='folder-name-input'>
							Folder Name
						</label>
						<input
							type='text'
							id='folder-name-input'
							name='folder-name'
							ref={this.folderName}
							required
						/>
					</div>
					<button type='submit' className='btn AddFolder__btn'>
						Add Folder
					</button>
				</form>
			</section>
		)
	}
}

AddFolder.propType = {
	push: PropTypes.func.isRequired
}