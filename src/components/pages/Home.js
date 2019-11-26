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


					<div dangerouslySetInnerHTML={{__html: '\t\t<div data-elementor-type=\"wp-page\" data-elementor-id=\"5\" class=\"elementor elementor-5\" data-elementor-settings=\"[]\">\n\t\t\t<div class=\"elementor-inner\">\n\t\t\t\t<div class=\"elementor-section-wrap\">\n\t\t\t\t\t\t\t<section class=\"elementor-element elementor-element-31480b33 elementor-section-height-min-height elementor-section-content-middle elementor-reverse-mobile elementor-section-boxed elementor-section-height-default elementor-section-items-middle elementor-section elementor-top-section\" data-id=\"31480b33\" data-element_type=\"section\" data-settings=\"{&quot;background_background&quot;:&quot;classic&quot;}\">\n\t\t\t\t\t\t<div class=\"elementor-container elementor-column-gap-no\">\n\t\t\t\t<div class=\"elementor-row\">\n\t\t\t\t<div class=\"elementor-element elementor-element-7cd70919 elementor-column elementor-col-50 elementor-top-column\" data-id=\"7cd70919\" data-element_type=\"column\">\n\t\t\t<div class=\"elementor-column-wrap  elementor-element-populated\">\n\t\t\t\t\t<div class=\"elementor-widget-wrap\">\n\t\t\t\t<div class=\"elementor-element elementor-element-16c5d0f5 elementor-widget elementor-widget-heading\" data-id=\"16c5d0f5\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\n\t\t\t\t<div class=\"elementor-widget-container\">\n\t\t\t<h2 class=\"elementor-heading-title elementor-size-default\">Playground for creative people.</h2>\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"elementor-element elementor-element-a910370 elementor-widget elementor-widget-text-editor\" data-id=\"a910370\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\n\t\t\t\t<div class=\"elementor-widget-container\">\n\t\t\t\t\t<div class=\"elementor-text-editor elementor-clearfix\"><p>I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p></div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"elementor-element elementor-element-1b4d68c2 elementor-align-left elementor-mobile-align-center elementor-widget elementor-widget-button\" data-id=\"1b4d68c2\" data-element_type=\"widget\" data-widget_type=\"button.default\">\n\t\t\t\t<div class=\"elementor-widget-container\">\n\t\t\t\t\t<div class=\"elementor-button-wrapper\">\n\t\t\t<a href=\"#\" class=\"elementor-button-link elementor-button elementor-size-sm elementor-animation-grow\" role=\"button\">\n\t\t\t\t\t\t<span class=\"elementor-button-content-wrapper\">\n\t\t\t\t\t\t<span class=\"elementor-button-text\">Read More</span>\n\t\t</span>\n\t\t\t\t\t</a>\n\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\t\t<div class=\"elementor-element elementor-element-6516e98c elementor-column elementor-col-50 elementor-top-column\" data-id=\"6516e98c\" data-element_type=\"column\">\n\t\t\t<div class=\"elementor-column-wrap  elementor-element-populated\">\n\t\t\t\t\t<div class=\"elementor-widget-wrap\">\n\t\t\t\t<div class=\"elementor-element elementor-element-27542b15 elementor-widget elementor-widget-image\" data-id=\"27542b15\" data-element_type=\"widget\" data-widget_type=\"image.default\">\n\t\t\t\t<div class=\"elementor-widget-container\">\n\t\t\t\t\t<div class=\"elementor-image\">\n\t\t\t\t\t\t\t\t\t\t<img width=\"450\" height=\"802\" src=\"http://dev.digital-source.com/wp-content/uploads/2019/11/phone-x.png\" class=\"attachment-full size-full\" alt=\"\" srcset=\"http://dev.digital-source.com/wp-content/uploads/2019/11/phone-x.png 450w, http://dev.digital-source.com/wp-content/uploads/2019/11/phone-x-168x300.png 168w\" sizes=\"(max-width: 450px) 100vw, 450px\" />\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>\n\t\t\t\t<section class=\"elementor-element elementor-element-517b4de elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section\" data-id=\"517b4de\" data-element_type=\"section\">\n\t\t\t\t\t\t<div class=\"elementor-container elementor-column-gap-default\">\n\t\t\t\t<div class=\"elementor-row\">\n\t\t\t\t<div class=\"elementor-element elementor-element-7ce410a elementor-column elementor-col-100 elementor-top-column\" data-id=\"7ce410a\" data-element_type=\"column\">\n\t\t\t<div class=\"elementor-column-wrap  elementor-element-populated\">\n\t\t\t\t\t<div class=\"elementor-widget-wrap\">\n\t\t\t\t<div class=\"elementor-element elementor-element-0ae1a44 elementor-aspect-ratio-169 elementor-widget elementor-widget-video\" data-id=\"0ae1a44\" data-element_type=\"widget\" data-settings=\"{&quot;aspect_ratio&quot;:&quot;169&quot;}\" data-widget_type=\"video.default\">\n\t\t\t\t<div class=\"elementor-widget-container\">\n\t\t\t\t\t<div class=\"elementor-wrapper elementor-fit-aspect-ratio elementor-open-inline\">\n\t\t\t<iframe class=\"elementor-video-iframe\" allowfullscreen src=\"https://www.youtube.com/embed/XHOmBV4js_E?feature=oembed&amp;start&amp;end&amp;wmode=opaque&amp;loop=0&amp;controls=1&amp;mute=0&amp;rel=0&amp;modestbranding=0\"></iframe>\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>\n\t\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t'}}></div>

				</section>
			</PageWrapper>
		)
	}
};

export default Home;