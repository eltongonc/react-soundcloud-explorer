import React from 'react';
import { Link } from 'react-router-dom';
import NoteIcon from './NoteIcon';

// Player template
function Tracks(props) {
	const trackList = props.trackList.map((item)=>{
		return {
			pageTitle: "Title",
			id: item.id,
			title: item.title,
			genre: item.genre || "No genre",
			description: item.description,
			stream_url: item.stream_url,
			created_at: item.created_at,
			path: item.permalink,
			soundcloudURL: item.permalink_url,
			uri: item.uri.replace("https://", ""),
			img: item.artwork_url,
			likes: item.likes_count ? `<i class="fa fa-heart"></i> ${item.likes_count}` : "",
			userImg: item.user.avatar_url || "../img/user.svg",
			userLink: item.user.permalink_url,
			userName: item.user.username,
			duration: item.duration
		};
	});
	
	if (trackList.length) {
		return (
			trackList.map((item, i) => (
				// <Link}>
					<article className="track" key={i} id={item.id} onClick={props.onSelectTrack.bind(this, item)}>
						{
							item.img ? 
								<img className="track__thumb" src={item.img} alt={item.title} />
								:
								<div className="track__thumb svg">
									<NoteIcon/>
								</div>
						}
						<div className="track__info">
							<h2 className="track__title">{item.title}
							</h2>
							<p value="track__likes" dangerouslySetInnerHTML={{__html: item.likes}}></p>
						</div>
							
					</article>
				// </Link>
			))
		);
	} else {
		return (
			<section>
				<h3>No song found, please try something else</h3>
			</section>
		);
	}
}

export default Tracks;