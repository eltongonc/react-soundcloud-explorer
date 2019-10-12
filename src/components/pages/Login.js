import React from 'react';

const Login = () => (
	<section id="login">
		<h2>Login</h2>
		<form action="#home" method="post">

			<input type="email" id="field-email" name="field-email" autocomplete="email" required autofocus />
			<label for="field-email">Email<small>(any)</small></label>

			<input type="password" id="field-password" name="field-password" required />
			<label for="field-password">Password<small>(any)</small></label>

			<input type="checkbox" id="field-stay-logged-in" name="field-stay-logged-in" value="stay-logged-in" />
			<label for="field-stay-logged-in">Stay logged in</label>

			<a href="#register">Forgot password</a>

			<button type="submit">Login</button>

		</form>
	</section>
)

export default Login;