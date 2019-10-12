import React from 'react';

function ShowMore() {
	return (
		<section>
			<h3>Search some more</h3>
			<form className="search" action="#search">
				<input type="text" id="search" name="q"/>
				<label htmlFor="search">Search a song</label>
			</form>
		</section>
	);
}

export default ShowMore;