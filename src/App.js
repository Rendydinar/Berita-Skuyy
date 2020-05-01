import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed';

class App extends Component {
  render() {
    return (
      <div className="container mx-auto flex flex-col h-screen">
        <NewsFeed />

		<footer className="text-center h-10 mt-12 mb-2">
			<p>&copy; {new Date().getFullYear()} by ❤️ Waingapu Developer</p>
		</footer>
      </div>
    );
  }
}

export default App;
