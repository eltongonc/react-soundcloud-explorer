import React from 'react';
const SC = window.SC;

// Player template
class Player extends React.Component { 
	constructor(props) {
		super(props);

		console.log(props.song.title);
		
		this.state = {
			playing: props.playing,
		}
	}

	componentDidMount() {
		this.player = SC.Widget(this.iframe);
	}

	componentDidUpdate(props) {
		this.player.isPaused((x) => console.log(x))
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
			<div className="player">
				<div className="player__inner">
					<button onClick={() => this.togglePlayer()}>
						<span><i className={this.state.playing ? "fa fa-pause": "fa fa-play"}/></span>
					</button>

					{
						props.song.title &&	<h3 className="track__title">{props.song.title}</h3>
					}
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