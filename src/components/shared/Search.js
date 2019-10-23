import React from 'react';

function Searchform(props) {
	let query;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (query) {
			props.onSubmit(query.value);
		}
	}

	return (
		<form className="search form" onSubmit={handleSubmit} action="#search">
			<div className="form__group">
				<input 
					ref={(q) => query = q}
					type="text"
					id="search"
					name="q"
					placeholder="Search a song"
				/>
				<label htmlFor="search">Search a song</label>
			</div>
			<button type="submit" name="button"><i className="fa fa-search"/></button>
		</form>
	);
}

export default Searchform;