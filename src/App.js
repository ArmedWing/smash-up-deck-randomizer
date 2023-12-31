import './App.css';
import AllDecks from './components/Decks';
import RandomNumber from './components/RandomNumber';
import Players from './components/Players';
import PlayersDecksInfo from './components/PlayersDecksInfo';

function App() {
  return (
    <div className="App">
      <AllDecks />
      <RandomNumber />
      <Players />
      <PlayersDecksInfo />
    </div>
  );
}

export default App;
