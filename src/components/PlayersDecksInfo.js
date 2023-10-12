import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import { useState, useEffect } from "react";


function PlayersDecksInfo () {

    const [players, setPlayers] = useState([]);

    const playerInfo = async () => {
        const playersRef = collection(db, "players");
        const querySnapshot = await getDocs(playersRef);
        
        const playerData = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            playerData.push(data);
        });

        console.log(playerData);
        setPlayers(playerData);
    }

    useEffect(() => {
        // Automatically fetch player data when the component mounts
        playerInfo();
    }, []);

    return (
        <div>
            <h3>Players:</h3>
            <button onClick={playerInfo}>Load Player Info</button>
            <ul>
                {players.map((player, index) => (
                <li key={index}>
                    {player.player} - Decks: {JSON.stringify(player.decks)}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default PlayersDecksInfo