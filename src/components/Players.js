import { db } from "../config/firebase";
import { React } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";

function Players() {
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
      const playerInfo = await getDoc(playerDocRef);
      updateDoc(playerDocRef, {
        win: Number(playerInfo.data().win) + Number(win),
      });

      let currentDecks = playerInfo.data().decks;

      currentDecks[winningDeck] = (currentDecks[winningDeck] || 0) + 1;

      await updateDoc(playerDocRef, { decks: currentDecks });
    } else {
      const newPlayerRef = await addDoc(playersRef, {
        player: playerName,
        decks: decks,
        win: Number(win),
      });
    }

    p.target.player.value = "";
    p.target.decks.value = "";
    p.target.win.value = "";

    alert("Win added...");
  };

  return (
    <div>
      <form onSubmit={(p) => addWin(p)}>
        <div className="fieldWrapper">
          <input name="player" id="playerName"></input>
          <label className="playerNameLabel" for="playerName">
            Player Name
          </label>
          <br></br>

          <input name="decks" id="decks"></input>
          <label className="winningDeckLabel" for="decks">
            Winning Deck
          </label>
          <br></br>

          <input name="win" id="win" type="number"></input>
          <label className="addWinLabel" for="win">
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
