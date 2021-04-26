import './GameOver.css';

function GameOver(props) {
    let winnerName = '';

    switch (props.winner) {
        case 1:
            winnerName = props.player1.name;
            break;
        case 2:
            winnerName = props.player2.name;
            break;
        case 3:
            winnerName = ''; //it's a tie
            break;
        default:
            console.log("switch case error");
            return;
    }
    return (
        <div id="game-over">
            {winnerName
                ? <span>{winnerName} wins!</span>
                : <span>It's a tie!</span>
            }
            <div className="pyro fireworks1"> {/* css fireworks by Eddie Lin on jsfiddle */}
                <div className="before"></div>
                <div className="after"></div>
            </div>
            <div className="pyro fireworks2"> {/* css fireworks by Eddie Lin on jsfiddle */}
                <div className="before"></div>
                <div className="after"></div>
            </div>
            <button id="rematch" onClick={props.rematch}>Rematch?</button>
        </div>
    );

}

export default GameOver;