import React from "react";
import { useState, useEffect } from "react";
import decksData from "../decks.json";
import ResetDeckList from "./Reset";

function AllDecks() {
  const [allDecks, setAllDecks] = useState(decksData.decks);
  const [randomDeck, setRandomDeck] = useState(null);

  // Function to get a random deck and remove it from the pool
  const getRandomDeck = () => {
    const randomIndex = Math.floor(Math.random() * allDecks.length);
    const selectedDeck = allDecks[randomIndex];

    // Remove the selected deck from the pool
    const updatedDecks = allDecks.filter((deck) => deck !== selectedDeck);
    setAllDecks(updatedDecks);
    setRandomDeck(selectedDeck);
  };

  const resetDeckList = () => {
    setAllDecks(decksData.decks);
  };

  // Initialize a random deck when the component mounts
  useEffect(() => {
    getRandomDeck();
  }, []);

  return (
    <div className="randomDeck">
      <div>
        {randomDeck ? (
          <>
            <p className="deckName">{randomDeck.name}</p>
            <img
              className="deckContainer"
              src={randomDeck.img}
              style={{ maxWidth: "400px", maxHeight: "400px" }}
              alt={randomDeck.name}
            />
          </>
        ) : (
          <>
            <p>No more decks in the pool.</p>
            <ResetDeckList resetDeckList={resetDeckList} />
          </>
        )}
      </div>
      <button className="randomButton" onClick={getRandomDeck}>
        Random Deck
      </button>
      <ResetDeckList resetDeckList={resetDeckList} />
    </div>
  );
}

export default AllDecks;
