import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Spinner from '../layout/Spinner';

class Lyrics extends Component {
	state = {
		track: {},
		lyrics: {}
	};
	async componentDidMount() {
		try {
			const urlLyrics = `${
				process.env.REACT_APP_ROOT_URL
			}/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${
				process.env.REACT_APP_API_KEY
			}`;
			const urlTrackInfo = `${
				process.env.REACT_APP_ROOT_URL
			}/track.get?track_id=${this.props.match.params.id}&apikey=${
				process.env.REACT_APP_API_KEY
			}`;

			const responseLyrics = await axios.get(urlLyrics);
			const responseTrack = await axios.get(urlTrackInfo);

			this.setState(prevState => ({
				lyrics: {
					...prevState.lyrics,
					...responseLyrics.data.message.body.lyrics
				},
				track: { ...prevState.track, ...responseTrack.data.message.body.track }
			}));
		} catch (e) {
			console.log('API ERROR', new Error(e));
		}
	}

	render() {
		const { track, lyrics } = this.state;
		return (
			<Fragment>
				{this.state.track.track_id && this.state.lyrics.lyrics_id ? (
					<Fragment>
						<h1>Lyrics</h1>
						<Link to="/">Go Back</Link>
						<div className="card mt-2">
							<h5 className="card-header">
								{track.track_name} by{' '}
								<span className="text-secondary">{track.artist_name}</span>
							</h5>
							<div className="card-body">
								<p className="card-text">
									{lyrics.lyrics_body.split('\n').map((line, i) => (
										<Fragment key={line + i}>
											{line}
											<br />
										</Fragment>
									))}
								</p>
							</div>
						</div>
						<ul className="list-group mt-3">
							<li className="list-group-item">
								<b>Album Id: </b>
								{track.album_id}
							</li>
							<li className="list-group-item">
								<b>Genre: </b>
								{
									track.primary_genres.music_genre_list[0].music_genre
										.music_genre_name
								}
							</li>
							<li className="list-group-item">
								<b>Explicit: </b>
								{track.explicit === 0 ? 'No' : 'Yes'}
							</li>
							<li className="list-group-item">
								<b>Release Date: </b>
								{moment(track.first_release_date).format('DD MMMM YYYY')}
							</li>
						</ul>
					</Fragment>
				) : (
					<Spinner />
				)}
			</Fragment>
		);
	}
}

export default Lyrics;
