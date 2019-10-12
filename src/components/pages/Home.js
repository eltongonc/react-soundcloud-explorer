import React from 'react';

const Home = () => (
	<section id="explorer">
		<form class="search" action="#search">
			<input type="text" id="search" name="q"/>
			<label for="search">Search a song</label>
			<button type="submit" name="button">Search</button>
		</form>
		<section id="content"></section>
	</section>
);

export default Home;