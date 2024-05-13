import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
// import { SDK_VERSION } from "firebase/app";

function PlayersDecksInfo() {
  const [players, setPlayers] = useState([]);
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);

  const playerInfo = async () => {
    const playersRef = collection(db, "players");
    const querySnapshot = await getDocs(playersRef);

    const playerData = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      playerData.push(data);
    });

    setPlayers(playerData);
    setShowPlayerInfo(true);
  };

  useEffect(() => {
    // Automatically fetch player data when the component mounts
    setShowPlayerInfo(false);
  }, []);

  return (
    <div>
      <h3>Players:</h3>
      <button onClick={playerInfo}>Load Player Info</button>

      <div className="playerInfo">
        {showPlayerInfo && (
          <div>
            {players.map((player, index) => (
              <div key={index} className="player-info">
                <h4 className="player-name">Player: {player.player}</h4>

                <div className="deck-info">
                  Decks:
                  {Object.keys(player.decks).map((deckName) => (
                    <div key={deckName}>
                      {deckName} - {player.decks[deckName]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayersDecksInfo;
