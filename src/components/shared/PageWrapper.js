import React from 'react';
import Header from './Header';
import Chat from './Chat';

const PageWrapper = ({children}) => (
	<div>
		<Header/>
		{children}
		<Chat/>
	</div>

);

export default PageWrapper;