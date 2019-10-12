import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Player from '../pages/Player';
import Register from '../pages/Register';
import Login from '../pages/Login';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/">
					<Home/>
				</Route>
				<Route path="/explorer">
					<Home/>
				</Route>
				<Route path="/player">
					<Player/>
				</Route>
				<Route path="/login">
					<Login/>
				</Route>
				<Route path="/register">
					<Register/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}




export default Router;