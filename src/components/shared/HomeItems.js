import React from 'react';
import { Link } from 'react-router-dom';

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
			img: item.artwork_url || "http://levivisser.nl/img/Icons/CD.png",
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
				<article key={i}>
					<h1>
						<Link id={item.id} to={`/player/${item.id}`}>{item.title}</Link>
					</h1>
	
					<img src={item.img} alt={item.title} />
					<p>Genre: {item.genre}</p>
					<p value="likes" dangerouslySetInnerHTML={{__html: item.likes}}></p>
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