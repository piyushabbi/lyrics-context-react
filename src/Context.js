import React, { Component } from 'react';
import axios from 'axios';
require('dotenv').config();

const Context = React.createContext();

// This is what we wrap our entire application with.
export class Provider extends Component {
	state = {
		heading: 'Top 10 Tracks',
		trackList: []
	};

	async componentDidMount() {
		try {
			const url = `${
				process.env.REACT_APP_ROOT_URL
			}/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
				process.env.REACT_APP_API_KEY
			}`;
      const response = await axios.get(url);
			this.setState(prevState => ({
        trackList: [...prevState.trackList, ...response.data.message.body.track_list]
      }));
		} catch (e) {
			console.log('API ERROR', new Error(e));
		}
	}

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

// This is what we import in out component
export const Consumer = Context.Consumer;
