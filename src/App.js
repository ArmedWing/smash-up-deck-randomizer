import "./App.css";
import AllDecks from "./components/Decks";
import RandomNumber from "./components/RandomNumber";
import Players from "./components/Players";
import PlayersDecksInfo from "./components/PlayersDecksInfo";
import React, { useState } from "react";


export const Context = React.createContext()

function App() {

  const [players, setPlayers] = useState([]);

  return (
    <div className="App">
      <Context.Provider value={[players, setPlayers]}>
        <AllDecks />
        <RandomNumber />
        <Players />
        <PlayersDecksInfo />
      </Context.Provider>
    </div>
  );
}

export default App;

// npm start
