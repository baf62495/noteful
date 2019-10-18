import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import dummyStore from './dummy-store';

import NoteListNav from './NoteListNav/NoteListNav';
import NotePageMain from './NotePageMain/NotePageMain';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePageNav';


export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)

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

	renderNavRoutes() {
		const {notes, folders} = this.state;
		return (
			<>
				{['/', '/folder/:folderId'].map(path => (
					<Route
						exact
						path={path}
						key={path}
						render={rprops => (
							<NoteListNav
								folders={folders}
								notes={notes}
								{...rprops}
							/>
						)}
					/>
				))}
				<Route
					path='/note/:noteId'
					render={rprops => {
						const {noteId} = rprops.match.params;
						const note = findNote(notes, noteId) || {};
						const folder = findFolder(folders, note.folderId);
						return <NotePageNav {...rprops} folder={folder} />
					}}
				/>
			</>	
		)
	}

	renderMainRoutes() {
		const {notes, folders} = this.state;
		return (
			<>
				{['/', '/folder/:folderId'].map(path => (
					<Route
						exact
						path={path}
						key={path}
						render={rprops => {
                            const {folderId} = rprops.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
							return (
								<NoteListMain
									{...rprops}
									notes={notesForFolder}
								/>
							)
						}}
					/>
				))}
				<Route
					path='/note/:noteId'
					render={rprops => {
						const {noteId} = rprops.match.params;
						const note = findNote(notes, noteId);
						return <NotePageMain {...rprops} note={note} />
					}}
				/>
			</>
		)
	}

	render() {
		return (
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
		);
	}
}
