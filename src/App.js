import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import dummyStore from './dummy-store';
import ApiContext from './ApiContext';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';


export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folderId === folderId).length

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			folders: dummyStore.folders,
			notes: dummyStore.notes
		}
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
			notes: this.state.note.filter(note => note.id !== noteId)
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
							{this.renderNavRoutes()}
						</aside>
						<main className='app__main'>
							{this.renderMainRoutes()}
						</main>
					</div>
				</div>
			</ApiContext.Provider>
		);
	}
}
