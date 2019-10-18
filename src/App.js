import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

export default class App extends React.Component {
	render() {
		return (
			<div className="App">
			  	<header className='app__header'>
						<Link to='/'><h1>Noteful</h1></Link>
				</header>
				<main className='app__main'>

				</main>
				<sidebar className='app__sidebar'>

				</sidebar>
			</div>
		);
	}
}
