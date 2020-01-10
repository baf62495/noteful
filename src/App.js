import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import ApiContext from './ApiContext';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';
import config from './config';
import ComponentError from './ComponentError';


export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			folders: [],
			notes: []
		}
	}

	componentDidMount() {
		Promise.all([
			fetch(`${config.API_ENDPOINT}/api/notes`),
			fetch(`${config.API_ENDPOINT}/api/folders`)
		])
			.then(([notesRes, foldersRes]) => {
				if (!notesRes.ok)
					return notesRes.json().then(e => Promise.reject(e))
				if (!foldersRes.ok)
					return foldersRes.json().then(e => Promise.reject(e))

				return Promise.all([
					notesRes.json(),
					foldersRes.json()
				])
			})
			.then(([notes, folders]) => {
				this.setState({ notes, folders })
			})
			.catch(error => {
				console.error({ error })
			})
	}

	handleAddNote = note => {
		this.setState({
			notes: [...this.state.notes, note]
		})
	}

	handleAddFolder = folder => {
		this.setState({
			folders: [...this.state.folders, folder]
		})
	}

	handleDeleteNote = noteId => {
		this.setState({
			notes: this.state.notes.filter(note => note.id !== noteId)
		})
	}

	renderNavRoutes() {
		return (
			<>
				{['/', '/folder/:folderId'].map(path => (
					<Route
						exact
						path={path}
						key={path}
						component={NoteListNav}
					/>
				))}
				<Route
					path='/note/:noteId'
					component={NotePageNav}
				/>
				<Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
			</>	
		)
	}

	renderMainRoutes() {
		return (
			<>
				{['/', '/folder/:folderId'].map(path => (
					<Route
						exact
						path={path}
						key={path}
						component={NoteListMain}
					/>
				))}
				<Route
					path='/note/:noteId'
					component={NotePageMain}
				/>
				<Route
					path='/add-note'
					component={AddNote}
				/>
				<Route
					path='/add-folder'
					component={AddFolder}
				/>
			</>
		)
	}

	render() {
		const value = {
			notes: this.state.notes,
			folders: this.state.folders,
			addFolder: this.handleAddFolder,
			addNote: this.handleAddNote,
			deleteNote: this.handleDeleteNote,
		}
		return (
			<ApiContext.Provider value={value}>
				<div className="App">
				  	<header className='app__header'>
						<Link to='/'><h1>Noteful</h1></Link>
					</header>
					<div className="wrapper">
						<aside className='app__sidebar'>
							<ComponentError>
								{this.renderNavRoutes()}
							</ComponentError>
						</aside>
						<main className='app__main'>
							<ComponentError>
								{this.renderMainRoutes()}
							</ComponentError>
						</main>
					</div>
				</div>
			</ApiContext.Provider>
		);
	}
}
