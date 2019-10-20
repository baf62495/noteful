import React from 'react';
import './NoteListNav.css';
import { NavLink } from 'react-router-dom';

import AddFolderButton from '../AddFolderButton/AddFolderButton';

export default function NoteListNav(props) {
	return (
		<div className='NoteListNav'>
			<ul className='NoteListNav__list'>
				{props.folders.map(folder =>
					<li key={folder.id}>
						<NavLink
							className='NoteListNav__folder-link'
							to={`/folder/${folder.id}`}
						>
							{folder.name}
						</NavLink>
					</li>)
				}
			</ul>
			<AddFolderButton />
		</div>
	)
}