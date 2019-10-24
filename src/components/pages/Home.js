import React from 'react';

import PageWrapper from '../shared/PageWrapper';
import HomeItems from '../shared/HomeItems';
import SOUNDCLOUD from '../shared/SoundCloud';
import Search from '../shared/Search';

const music = new SOUNDCLOUD();


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			query: '',
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
		
		// const data = await music.getSong({query});

		// this.setState({
		// 	data
		// });
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
						<HomeItems articles={this.state.data}/>

						<section className="tracks__more">
							<h3>Search more songs</h3>
							<Search onSubmit={this.handleSubmit}/>
						</section>
					</section>
				</section>
			</PageWrapper>
		)
	}
};

export default Home;