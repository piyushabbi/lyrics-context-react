import React from 'react';
import { Link } from 'react-router-dom';

const Track = props => {
	const { artist_name, track_name, album_name, track_id } = props;
	return (
		<li className="col-md-6">
			<div className="card mb-4 shadow-sm">
				<div className="card-body">
					<h5>{artist_name}</h5>
					<div className="card-text mb-2">
						<p>
							<i className="fas fa-play" />
							{' Track'}: {track_name}
						</p>
						<p>
							<i className="fas fa-compact-disc" />
							{' Album'}: {album_name}
						</p>
					</div>
					<Link to={`lyrics/track/${track_id}`} className="btn btn-dark btn-block">
						{"View Lyrics "}
						<i className="fas fa-chevron-right" />
					</Link>
				</div>
			</div>
		</li>
	);
};

export default Track;
