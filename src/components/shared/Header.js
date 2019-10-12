import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
		<nav>
			<h1>
				<Link to="/">
					<svg>
						<circle/>
						<circle/>
						<circle/>
						<circle/>
					</svg>
					Soundcloud explorer
				</Link>
			</h1>
			<ul>
				<li>
					<Link to="/explorer" aria-label="Home, current page">Explore music</Link>
				</li>
				<li >
					<Link to="/player">Player</Link>
					<ul>
						<li><Link tabIndex="0" to="/new-playlist">New playlist</Link></li>
						<li><Link tabIndex="0" to="/history">New playlist</Link></li>
					</ul>
				</li>
				<li><Link to="/login">Profile</Link></li>
			</ul>
		</nav>
	</header>
  );
}

export default Header;
