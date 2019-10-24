import React from 'react';

import PageWrapper from '../shared/PageWrapper';
import Tracks from '../shared/Tracks';
import SOUNDCLOUD from '../shared/SoundCloud';
import Search from '../shared/Search';
import Player from '../shared/Player';

const music = new SOUNDCLOUD();

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			query: '',
			song: {},
		}
	}

	async resolveData() {
		try {

			let data
			if(localStorage.data) {
				data = JSON.parse(localStorage.data) 
			} else {
				data = await music.getList();
				localStorage.data = JSON.stringify(data);
			}

			this.setState({
				data,
			});

		} catch(e) {
			console.log('error at resolveData',e);
		}
	}

	async handleSubmit(query) {
		console.log(query);
	}

	selectSong(song) {
		console.log(song);
		this.setState({
			song,	
		})
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

		let url = `https%3A//${this.state.song.uri}`;

		for (const key in query) {
			if (query.hasOwnProperty(key)) {
				const value = query[key];
				url += `&amp;${key}=${value}`;
			}
		}
		
		return baseURL + url;
	}

	componentDidMount() {
		this.resolveData();
	}

	render() {
		return (
			<PageWrapper>
				<section id="explorer" className="home">
					<Search onSubmit={this.handleSubmit}/>
					<section id="content" className="tracks">
						<Tracks onSelectTrack={(song) => this.selectSong(song)} trackList={this.state.data}/>

						<section className="tracks__more">
							<h3>Search more songs</h3>
							<Search onSubmit={this.handleSubmit}/>
						</section>
					</section>

					<div className="player">
						<Player playing={this.state.song.uri ? true : false} song={this.state.song} src={this.generateURI()}/>
					</div>

				</section>
			</PageWrapper>
		)
	}
};

export default Home;