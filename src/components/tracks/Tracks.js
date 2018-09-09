import React, { Component, Fragment } from 'react';
import { Consumer } from '../../Context';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
	render() {
		return (
			<Consumer>
				{value => (
					<Fragment>
						{value.trackList.length === 0 ? (
							<Spinner />
						) : (
							<Fragment>
								<h1 className="mb-4">{value.heading}</h1>
									<ul className="row">
										{value.trackList.map(m => (
											<Track key={m.track.track_id} {...m.track} />
										))}
									</ul>
							</Fragment>
						)}
					</Fragment>
				)}
			</Consumer>
		);
	}
}

export default Tracks;
