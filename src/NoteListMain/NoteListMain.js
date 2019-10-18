import React from 'react';
import './NoteListMain.css';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';

export default function NoteListMain(props) {
	return (
		<p>This is the NoteListMain {props.match.params.folderId} Component</p>
	)
}