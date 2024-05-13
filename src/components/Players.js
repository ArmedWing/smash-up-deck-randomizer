import { db } from "../config/firebase";
import { React, useContext } from "react";
import { Context } from "../App";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";

function Players() {
  const [players, setPlayers] = useContext(Context);

  const addWin = async (p) => {
    p.preventDefault();

    const playerName = p.target.player.value;
    const winningDeck = p.target.decks.value;
    const win = p.target.win.value;

    const decks = {};
    decks[winningDeck] = 1;

    const playersRef = collection(db, "players");
    const querySnapshot = await getDocs(playersRef);

    let playerExists = false;
    let playerId;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.player === playerName) {
        playerExists = true;
        playerId = doc.id;
      }
    });

    if (playerExists) {
      const playerDocRef = doc(db, "players", playerId);
      let playerInfo = await getDoc(playerDocRef);
      playerInfo = playerInfo.data();
      playerInfo.win = Number(playerInfo.win) + Number(win);
      playerInfo.decks[winningDeck] =
        (playerInfo.decks[winningDeck] || 0) + Number(win);
      const playerIndex = players.findIndex(
        (player) => player.player === playerInfo.player
      );

      if (playerIndex > -1) {
        let playersCopy = [...players];
        playersCopy.splice(playerIndex, 1, playerInfo);
        setPlayers(playersCopy);
      }

      updateDoc(playerDocRef, {
        win: playerInfo.win,
        decks: playerInfo.decks,
      });

    } else {
      let playerData = {
        player: playerName,
        decks: decks,
        win: Number(win),
      };
      const newPlayerRef = await addDoc(playersRef, playerData);
      let playerCopy = [...players];
      playerCopy.push(playerData);

      setPlayers(playerCopy)
    }

    p.target.player.value = "";
    p.target.decks.value = "";
    p.target.win.value = "";
  };

  return (
    <div>
      <form onSubmit={(p) => addWin(p)}>
        <div className="fieldWrapper">
          <input name="player" id="playerName"></input>
          <label className="playerNameLabel" htmlFor="playerName">
            Player Name
          </label>
          <br></br>

          <input name="decks" id="decks"></input>
          <label className="winningDeckLabel" htmlFor="decks">
            Winning Deck
          </label>
          <br></br>

          <input name="win" id="win" type="number"></input>
          <label className="addWinLabel" htmlFor="win">
            Add winning times
          </label>
          <br></br>
        </div>
        <button className="addWinButton">Add win</button>
      </form>
    </div>
  );
}

export default Players;
