import React from 'react';
import PageWrapper from '../shared/PageWrapper';
import SOUNDCLOUD from '../shared/SoundCloud';
const song = new SOUNDCLOUD();

class Player extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			songData: {},
		}
	}

	async resolveSong() {
		try {
			const songData = await song.getSong(this.props.match.params.id);
			this.setState({
				songData,
			});
		} catch(e) {
			console.log('error at resolveData',e);
		}
	}

	componentDidMount() {
		this.resolveSong();
	}
	
	render() {
		const { songData } = this.state;
		console.log(songData);
		

		if (songData) {
			return(
				<PageWrapper>
					<section id="player">
						<article>
							<h1>{songData.title}</h1>
							<figure>
								<div style={{backgroundImage: `url(${songData.img})`}}>&amp;</div>
								<img src={songData.img} alt={songData.userName} />
							</figure>
							<figcaption>
								<iframe title="player" width="100%" height="166" scrolling="no" frameBorder="no" src={`https://w.soundcloud.com/player/?url=${songData.uri}&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false`}></iframe>
								<p>{songData.description}</p>
								
								{/*<Rating/>*/}
								
								<footer>
									<a href={songData.userLink}><img src={songData.userImg} alt={songData.userName}/>{songData.userName}</a>
									<a href={songData.soundcloudURL}>Listen on <span>soundcloud</span></a>
									<time dateTime={songData.created_at}>{songData.created_at}</time>
								</footer>
							</figcaption>
						</article>
					</section>
				</PageWrapper>
			);
		} else {
			return (
				<PageWrapper>
					<section id="player">
						<article>
							<h3>No song selected yet, try search something first</h3>
							<a href="#explorer" role="button">Explore some awesome songs</a>
						</article>
					</section>
				</PageWrapper>
			);
		}
	}
};

export default Player;