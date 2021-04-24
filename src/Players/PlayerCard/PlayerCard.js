import Setup from '../Setup/Setup';

import './PlayerCard.css';

function Player(props) {
    return (
        <table className={`player${props.turn ? " my-turn" : ""}${props.winner ? " winner-declared" : ""}`}>
            <tbody>
                <tr>
                    <td className="label">Player {props.number}:</td>
                        {props.nameSet
                        ? <td className="input">
                            {((props.winner === props.number) || (props.winner === 3))
                                ? <span className="winner-crown">{String.fromCharCode("0xD83D", "0xDC51")}</span>
                                : null
                            }
                            {props.name}
                            </td>
                        : <Setup id={props.number}
                            name={props.name}
                            buttonFunc={props.setPlayer}
                            handleChange={props.handleChange} />
                    }
                    
                </tr>
                <tr>
                    <td className="label">Score:</td>
                    <td className="input">
                        {props.score}
                    </td>
                </tr>
            </tbody>
        </table>
    );

}

export default Player;