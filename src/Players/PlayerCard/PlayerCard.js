import Setup from '../Setup/Setup';

import './PlayerCard.css';

function Player(props) {
    return (
        <table className={`player ${props.turn ? "my-turn" : ""}`}>
            <tbody>
                <tr>
                    <td className="label">Player {props.number}:</td>
                    <td className="input">
                        {props.nameSet
                        ? props.name
                        : <Setup id={props.number}
                            name={props.name}
                            buttonFunc={props.setPlayer}
                            handleChange={props.handleChange} />
                    }
                    </td>
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