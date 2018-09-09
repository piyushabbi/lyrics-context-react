import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../Context';

class Search extends Component {
	state = {
		trackTitle: ''
	};
	onChangeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmitHandler = async (e, dispatch) => {
		e.preventDefault();
		try {
			const searchTrack = `${
				process.env.REACT_APP_ROOT_URL
			}/track.search?q_artist=${
				this.state.trackTitle
			}&page_size=10&page=1&s_track_rating=desc&apikey=${
				process.env.REACT_APP_API_KEY
			}`;

			const response = await axios.get(searchTrack);
			if (this.state.trackTitle.trim().length > 0) {
				dispatch({
					payload: response.data.message.body.track_list,
					type: 'SEARCH_TRACKS'
				});
			}
		} catch (e) {
			console.log('API ERROR', new Error(e));
		}
	};

	render() {
		return (
			<Consumer>
				{value => (
					<div className="card card-body mb-4 p4">
						<h1 className="display-4 text-center">
							<i className="fas fa-music" />
							{' Search for a Song'}
						</h1>
						<p className="lead text-center">Get Lyrics for Songs</p>
						<form
							autoComplete={'off'}
							onSubmit={e => this.onSubmitHandler(e, value.dispatch)}
						>
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Song Title..."
									name="trackTitle"
									value={this.state.trackTitle}
									onChange={this.onChangeHandler}
									autoComplete={'off'}
								/>
							</div>
							<button className="btn btn-primary btn-lg mb-2 btn-block">
								Search
							</button>
						</form>
					</div>
				)}
			</Consumer>
		);
	}
}

export default Search;
