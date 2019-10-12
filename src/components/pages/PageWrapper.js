import React from 'react';
import Header from '../shared/Header';
import Chat from '../shared/Chat';

const PageWrapper = ({children}) => (
	<div>
		<Header/>
		{children}
		<Chat/>
	</div>

);

export default PageWrapper;