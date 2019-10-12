import React, { useState } from 'react';
import PageWrapper from './PageWrapper';
import HomeItems from '../shared/HomeItems';
import SOUNDCLOUD from '../shared/SoundCloud';
import ShowMore from '../shared/ShowMore';
const music = new SOUNDCLOUD();


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		}
	}

	async resolveData() {
		try {
			const data = await music.getList();
			this.setState({
				data,
			});
		} catch(e) {
			console.log('error at resolveData',e);
		}
	}

	componentDidMount() {
		this.resolveData();
	}

	render() {
		console.log(this.state.data);
		
		return (
			<PageWrapper>
				<section id="explorer">
					<form className="search" action="#search">
						<input type="text" id="search" name="q"/>
						<label htmlFor="search">Search a song</label>
						<button type="submit" name="button">Search</button>
					</form>
					<section id="content">
						<HomeItems articles={this.state.data}/>
						<ShowMore/>
					</section>
				</section>
			</PageWrapper>
		)
	}
};

export default Home;