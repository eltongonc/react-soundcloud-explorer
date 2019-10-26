import React from 'react';
import NoteIcon from './NoteIcon';
const SC = window.SC;

// Player template
class Player extends React.Component { 
	constructor(props) {
		super(props);

		this.state = {
			playing: props.playing,
		}
	}

	componentDidMount() {
		this.player = SC.Widget(this.iframe);
	}

	togglePlayer() {
		this.player.toggle()

		this.setState({
			playing: !this.state.playing,
		})
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
						<button onClick={() => props.prev()}>
							<span><i className="fa fa-backward"/></span>
						</button>
						<button onClick={() => this.togglePlayer()}>
							<span><i className={this.state.playing ? "fa fa-pause": "fa fa-play"}/></span>
						</button>
						<button onClick={() => props.next()}>
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
					src={props.src}
				/>
			</div>
		);
	}
}

export default Player;