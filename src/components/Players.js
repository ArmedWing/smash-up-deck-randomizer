import { db } from "../config/firebase"
import React from "react"
import { addDoc, collection, doc, getDocs, updateDoc, FieldValue, setDoc, getDoc} from "firebase/firestore"


function Players() {

    const addWin = async (p) => {
        p.preventDefault();
    
        const playerName = p.target.player.value;
        const winningDeck = p.target.deck.value;
        const win = p.target.win.value;
    
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
            const playerInfo = await getDoc(playerDocRef)            
            updateDoc(playerDocRef, {win: Number(playerInfo.data().win) + Number(win)})
            

        } else {
            
            const newPlayerRef = await addDoc(playersRef, { player: playerName, deck: winningDeck, win: Number(win) });

        }
    
        alert("Win added...");
    };


    return (
        <div>
            <form onSubmit={(p) => addWin(p)}>
                <input name='player' id='playerName'></input>
                <label for="playerName">Player Name</label><br></br>

                <input name='deck' id='deck'></input>
                <label for="deck">Winning Deck</label><br></br>                

                <input name='win' id='win'  type="number"></input>
                <label for="win">Add win</label><br></br>                
                <button>Add win</button>
            </form>

            
            
            <p>Players:</p>
            <p></p>
        </div>
    )
}

export default Players