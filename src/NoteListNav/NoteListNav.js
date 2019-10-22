import React from 'react';
import './NoteListNav.css';
import { NavLink } from 'react-router-dom';
import AddFolderButton from '../AddFolderButton/AddFolderButton';
import ApiContext from '../ApiContext';

export default class NoteListNav extends React.Component {
	static contextType = ApiContext

	render() {
		const { folders } = this.context
		return (
			<div className='NoteListNav'>
				<ul className='NoteListNav__list'>
					{folders.map(folder =>
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
}



// render={rprops => (
// 	<NoteListNav
// 		folders={folders}
// 		notes={notes}
// 		{...rprops}
// 	/>
// )}