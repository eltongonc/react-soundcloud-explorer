import React from 'react';
import PageWrapper from './PageWrapper';

const Register = () => (
	<PageWrapper>
		<section id="register">
			<section className="player">
				<nav>
					<h1>Lost password</h1>
					<progress value="0.25" max="1">25%</progress>
					<ol>
						<li><a href="/cart">Cart</a></li>
						<li><a href="#main-content" aria-label="Address, current step">Address</a></li>
						<li>Payment</li>
						<li>Confirm</li>
					</ol>
				</nav>
			</section>
		</section>
	</PageWrapper>
);

export default Register;