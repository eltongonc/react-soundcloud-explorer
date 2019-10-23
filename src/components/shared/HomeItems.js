import React from 'react';
import { Link } from 'react-router-dom';
import NoteIcon from './NoteIcon';

// Player template
function HomeItems(props) {
	const articles = props.articles.map((item)=>{
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
	
	if (articles.length) {
		return (
			articles.map((item, i) => (
				<article className="track" key={i}>
					{
						item.img ? 
							<img className="track__thumb" src={item.img} alt={item.title} />
							:
							<div className="track__thumb svg">
								<NoteIcon/>
							</div>
					}
					<div className="track__info">
						<h2 className="track__title">
							<Link id={item.id} to={`/player/${item.id}`}>{item.title}</Link>
						</h2>
						<p value="track__likes" dangerouslySetInnerHTML={{__html: item.likes}}></p>
					</div>
						
				</article>
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

export default HomeItems;