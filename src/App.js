import './App.css';
import AllDecks from './components/Decks';
import RandomNumber from './components/RandomNumber';
import Players from './components/Players';

function App() {
  return (
    <div className="App">
      <AllDecks />
      <RandomNumber />
      <Players />
    </div>
  );
}

export default App;
