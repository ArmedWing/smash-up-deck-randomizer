import React from "react";



function ResetDeckList() {
    const handleResetClick = () => {
        window.location.reload()
    };

    return (
        <div>
            <button onClick={handleResetClick}>Reset Deck List</button>
        </div>
    );
}

export default ResetDeckList