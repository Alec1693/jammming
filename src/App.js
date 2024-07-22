import './App.css';
import Playlist from './playlist';
import SearchBar from './searchBar';
import SearchResults from './searchResults';
import songData from './songTestData';

function App() {
  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar />
      <SearchResults data={songData}/>
      <Playlist />
    </div>
  );
}

export default App;
