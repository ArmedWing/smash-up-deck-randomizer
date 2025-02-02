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
            <div className="imageContainer">
              <img
                className="deckContainer"
                src={randomDeck.img}
                style={{
                  maxWidth: "350px",
                  maxHeight: "350px",
                  minHeight: "350px",
                }}
                alt={randomDeck.name}
              />
              {randomDeck.titan ? (
                <img
                  className="deckContainer"
                  src={randomDeck.titan}
                  style={{
                    maxWidth: "350px",
                    maxHeight: "350px",
                    minHeight: "350px",
                  }}
                  alt={randomDeck.name}
                />
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <p>No more decks in the pool...</p>
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
