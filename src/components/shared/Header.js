import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
	const [ menuOpen, toggleMenu ] = useState(false);

	return (
		<header className="header">
			<button onClick={() => toggleMenu(!menuOpen)} className="menu-button"><i className="fa fa-bars"/></button>

			<h1 className="logo">
				<Link to="/">
					<svg>
						<circle/>
						<circle/>
						<circle/>
						<circle/>
					</svg>

					<span>Soundcloud explorer</span>
				</Link>
			</h1>
			
			<nav className={menuOpen ? 'nav nav--open' : 'nav'}>
				<ul>
					<li>
						<Link to="/explorer" aria-label="Home, current page">Explore music</Link>
					</li>
					<li >
						<Link to="/player">Player</Link>
					</li>
					<li><Link to="/login">Profile</Link></li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
