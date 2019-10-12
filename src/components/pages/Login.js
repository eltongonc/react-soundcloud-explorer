import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loggedIn: false,
		}
	}

	render() {
		return (
			<div>
				<section id="login">
					<h2>Login</h2>
					<form action="#home" method="post">
		
						<input className={this.state.email ? 'has-value' : ''} type="email" id="field-email" name="field-email" autoComplete="asd" required defaultValue={this.state.email}/>
						<label htmlFor="field-email">Email<small>(any)</small></label>
		
						<input className={this.state.password ? 'has-value' : ''} type="password" id="field-password" name="field-password" autoComplete="asd" required  defaultValue={this.state.password}/>
						<label htmlFor="field-password">Password<small>(any)</small></label>
		
						<input type="checkbox" id="field-stay-logged-in" name="field-stay-logged-in" value="stay-logged-in" defaultChecked={this.state.loggedIn}/>
						<label htmlFor="field-stay-logged-in">Stay logged in</label>
		
						<Link to="/register">Forgot password</Link>
		
						<button type="submit">Login</button>
		
					</form>
				</section>
			</div>
		);
	}
};

export default Login;