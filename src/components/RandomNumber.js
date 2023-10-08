import { useState } from "react";

function RandomNumber () {
    const [ranNum, setRanNum] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    
    

    const randomNum = () => {
        const randomNumber = Math.round(Math.random() * (100 - 1) + 1);
        setRanNum(randomNumber);
        setButtonClicked(true);
    };

    const resetNum = () => {
        setButtonClicked(false)
    }

    return (
        <div>
            <p>Number: {buttonClicked ? ranNum : 0}</p>
            <button onClick={randomNum}>Roll...</button>
            <button onClick={resetNum}>Reset number</button>
        </div>
    )
}

export default RandomNumber