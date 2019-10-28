import React from 'react';
import NoteIcon from './NoteIcon';
const SC = window.SC;

// Player template
class Player extends React.Component {
	constructor(props) {
		super(props);
		this.iframe = React.createRef()
	}

	componentDidMount() {
		console.log('mounted');
		
		this.player = SC.Widget(this.iframe);


		this.player.bind(SC.Widget.Events.READY, () => {
			
			this.player.bind(SC.Widget.Events.PLAY, (currentSound) => {
				console.log(currentSound.id + " " + currentSound.title + " " + currentSound.artwork_url);
			});

			this.player.bind(SC.Widget.Events.PLAY_PROGRESS, (currentSound) => {
				console.log('playing');
			});

			this.player.bind(SC.Widget.Events.FINISH, () => {
				console.log("Finish");
				// play_next_shuffled_song();
			});
		})
	}

	togglePlayer() {
		this.player.toggle()

		this.props.onTogglePlay();
	}

	generateURI() {
		const baseURL = 'https://w.soundcloud.com/player/?url=';
		const query = {
			auto_play: true,
			color: '#333333',
			buying: false,
			sharing: false,
			download: false,
			show_playcount: false,
			show_artwork: false,
			show_user: false,
			single_active: false,
			hide_related: true,
			show_comments: false,
			show_reposts:false,
		}

		let url = this.props.song.uri;

		for (const key in query) {
			if (query.hasOwnProperty(key)) {
				const value = query[key];
				url += `&amp;${key}=${value}`;
			}
		}
		
		return baseURL + url;
	}

	componentDidUpdate() {
		this.player.getSounds((sounds) => {
			console.log(sounds);
		});
	}

	render() {
		const { props } = this;
		
		return (
			<div className={ props.song.uri ? 'player' : 'player player--hidden'}>
				<div className="player__inner">
					<div className="player__thumb">
						{
							props.song.img ? 
								<img className="track__thumb" src={props.song.img} alt={props.song.title} />
								:
								<div className="track__thumb svg">
									<NoteIcon/>
								</div>
						}
					</div>

					<div className="player__description">
						{
							props.song.title &&	<h3 className="track__title">{props.song.title}</h3>
						}
					</div>

					<div className="player__controls">
						<button onClick={props.prev}>
							<span><i className="fa fa-backward"/></span>
						</button>
						<button onClick={this.togglePlayer.bind(this)}>
							<span><i className={props.playing ? "fa fa-pause": "fa fa-play"}/></span>
						</button>
						<button onClick={props.next}>
							<span><i className="fa fa-forward"/></span>
						</button>
					</div>
				</div>

				<iframe
					className="player__iframe"
					ref={(x) => this.iframe = x}
					title="iframe"
					width="100%"
					height="166"
					scrolling="no"
					frameBorder="no"
					allow="autoplay"
					src={this.generateURI()}
				/>
			</div>
		);
	}
}

export default Player;