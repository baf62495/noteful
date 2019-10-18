import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function Note(props) {
	return (
		<div className='note'>
			<h2 className='Note__title'>
				<Link to={`./note/${props.id}`}>
					{props.name}
				</Link>
			</h2>
			<div className='Note__modified'>
				Last modified on {' '}
				<span className='date'>
					{format(new Date(props.modified), 'dd/MM/yyyy')}
				</span>
			</div>
		</div>
	)
}