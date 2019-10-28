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
			songIndex: 0,
			playing: false,
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
		try {
			const data = await music.searchSong(query);

			this.setState({
				data,
			});
		} catch(e) {
			console.log('error at resolveData',e);
		}

	}

	selectSong(song, songIndex) {
		this.setState({
			song,
			songIndex,
		});

		const songs = document.querySelectorAll('.track');

		for (let i = 0; i < songs.length; i++) {
			const song = songs[i];
			song.classList.remove('playing');
		}

		const songEl = document.getElementById(song.id);
		songEl.classList.add('playing');

		this.togglePlay(true);
	}

	next() {
		const nextIndex = this.state.songIndex + 1;

		let song = this.state.data[nextIndex];
		song = {
			pageTitle: "Title",
			id: song.id,
			title: song.title,
			genre: song.genre || "No genre",
			description: song.description,
			stream_url: song.stream_url,
			created_at: song.created_at,
			path: song.permalink,
			soundcloudURL: song.permalink_url,
			uri: song.uri,
			img: song.artwork_url,
			likes: song.likes_count ? `<i class="fa fa-heart"></i> ${song.likes_count}` : "",
			userImg: song.user.avatar_url || "../img/user.svg",
			userLink: song.user.permalink_url,
			userName: song.user.username,
			duration: song.duration
		};

		this.selectSong(song, nextIndex);
	}

	prev() {
		if (this.state.songIndex > 0) {
			
			const prevIndex = this.state.songIndex - 1;
	
			let song = this.state.data[prevIndex];
			song = {
				pageTitle: "Title",
				id: song.id,
				title: song.title,
				genre: song.genre || "No genre",
				description: song.description,
				stream_url: song.stream_url,
				created_at: song.created_at,
				path: song.permalink,
				soundcloudURL: song.permalink_url,
				uri: song.uri.replace("https://", ""),
				img: song.artwork_url,
				likes: song.likes_count ? `<i class="fa fa-heart"></i> ${song.likes_count}` : "",
				userImg: song.user.avatar_url || "../img/user.svg",
				userLink: song.user.permalink_url,
				userName: song.user.username,
				duration: song.duration
			};

			this.selectSong(song, prevIndex);
		}
	}

	togglePlay(status) {
		this.setState({
			playing: status || !this.state.playing
		})
	}

	componentDidMount() {
		this.resolveData();
	}

	render() {
		return (
			<PageWrapper>
				<section id="explorer" className="home">
					<Search onSubmit={(query) =>this.handleSubmit(query)}/>

					<section id="content" className="tracks">
						<Tracks onSelectTrack={this.selectSong.bind(this)} trackList={this.state.data}/>

						<section className="tracks__more">
							<h3>Search more songs</h3>
							<Search onSubmit={this.handleSubmit}/>
						</section>
					</section>

					<Player
						playing={this.state.playing}
						onTogglePlay={this.togglePlay.bind(this)}
						song={this.state.song}
						next={this.next.bind(this)}
						prev={this.prev.bind(this)}
					/>

				</section>
			</PageWrapper>
		)
	}
};

export default Home;