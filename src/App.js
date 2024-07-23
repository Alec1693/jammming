import './App.css';
import Playlist from './playlist';
import SearchBar from './searchBar';
import SearchResults from './searchResults';
import songData from './songTestData';
import SongDisplay from './songsDisplay';

function App() {
  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <SongDisplay data={songData}/>
    </div>
  );
}

export default App;
