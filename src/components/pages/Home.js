import React from 'react';
import PageWrapper from '../shared/PageWrapper';
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

	async handleSubmit(e) {
		e.preventDefault();

		const query = this.q.value;

		const data = await music.getSong({query});

		console.log(data);
		
		this.setState({
			data
		});
	}

	componentDidMount() {
		this.resolveData();
	}

	render() {
		return (
			<PageWrapper>
				<section id="explorer">
					<form className="search" onSubmit={this.handleSubmit.bind(this)} action="#search">
						<input ref={(q) => this.q = q} type="text" id="search" name="q"/>
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