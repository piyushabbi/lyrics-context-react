import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from './Context';
import Navbar from './components/layout/NavBar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

class App extends Component {
	render() {
		return (
			<Provider>
				<BrowserRouter>
					<Fragment>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Index} />
								<Route path="/lyrics/track/:id" component={Lyrics} />
							</Switch>
						</div>
					</Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
