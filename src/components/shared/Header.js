import React from 'react';

function Header() {
  return (
    <header>
		<nav>
			<h1>
				<a href="./">
					<svg><circle/><circle/><circle/><circle/></svg>
					Soundcloud explorer
				</a>
			</h1>
			<ul>
				<li><a href="#explorer" aria-label="Home, current page">Explore music</a></li>
				<li >
					<a href="#player">Player</a>
					<ul>
						<li><a tabindex="0" href="#new_playlist">New playlist</a></li>
						<li><a tabindex="0" href="#history">New playlist</a></li>
					</ul>
				</li>
				<li><a href="#login">Profile</a></li>
			</ul>
		</nav>
	</header>
  );
}

export default Header;
