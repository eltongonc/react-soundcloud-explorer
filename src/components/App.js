import React from 'react';
import Router from './shared/Router';
import Header from './shared/Header';
import Chat from './shared/Chat';



function App() {
  return (
    <div>
      <Header/>
      <Router/>
      <Chat/>
    </div>
  );
}

export default App;
