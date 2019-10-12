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
				<Route exact path="/" component={Home}/>
				<Route exact path="/explorer" component={Home}/>
				<Route exact path="/player" component={Player}/>
				<Route exact path="/player/:id" component={Player}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/register" component={Register} />
			</Switch>
		</BrowserRouter>
	);
}




export default Router;