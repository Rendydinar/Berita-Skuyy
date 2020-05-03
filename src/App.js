import React, { Component } from 'react';
import NewsFeed from './components/NewsFeed';

class App extends Component {
  render() {
    return (
      <div>
        <div className="section-custom">
          <h3 className="text-4xl pt-8 text-center" style={{fontFamily: 'Pacifico'}} >BERITA SKUYY</h3> 
          <p className="mb-4 text-base text-center" style={{fontFamily: 'Pacifico'}}>Situs Pencari Berita Utama Nasional Hingga Internasional Dengan Berbagai Pilihan</p>
          <svg id="curve-custom" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1416.99 174.01"><path className="cls-1-custom" d="M0,280.8S283.66,59,608.94,163.56s437.93,150.57,808,10.34V309.54H0V280.8Z" transform="translate(0 -135.53)"></path></svg>
        </div>
        <div className="container mx-auto flex flex-col h-screen">
          <NewsFeed />
      		<footer className="text-center h-10 mt-12 mb-2">
  		    	<p>&copy; {new Date().getFullYear()} by ❤️ Waingapu Developer</p>
  		    </footer>
        </div>
      </div>
    );
  }
}

export default App;
