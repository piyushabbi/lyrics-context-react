import React, { Component, Fragment } from 'react';
import { Consumer } from '../../Context';
import Spinner from '../layout/Spinner';

class Tracks extends Component {
	render() {
		return (
			<Consumer>
				{value => (
					<div>
						{value.trackList.length === 0 ? (
							<Spinner />
						) : (
							<Fragment>
								<h1>{value.heading}</h1>
									<ul>
										{value.trackList.map(m => (
											<li key={m.track.track_id}>{m.track.track_name}</li>
										))}
									</ul>
							</Fragment>
						)}
					</div>
				)}
			</Consumer>
		);
	}
}

export default Tracks;
