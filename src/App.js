import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

import MainPageMain from './MainPageMain/MainPageMain';
import MainPageNav from './MainPageNav/MainPageNav';
import FolderPageMain from './FolderPageMain/FolderPageMain';
import FolderPageNav from './FolderPageNav/FolderPageNav';

export default class App extends React.Component {
	render() {
		return (
			<div className="App">
			  	<header className='app__header'>
					<Link to='/'><h1>Noteful</h1></Link>
				</header>
				<div class="wrapper">
					<sidebar className='app__sidebar'>
						<Route exact path='/' component={MainPageNav} />
						<Route path='/folder' component={FolderPageNav} />
					</sidebar>
					<main className='app__main'>
						<Route exact path='/' component={MainPageMain} />
						<Route path='/folder' component={FolderPageMain} />
					</main>
				</div>
			</div>
		);
	}
}
