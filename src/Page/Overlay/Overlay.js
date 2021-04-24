import './Overlay.css';

function Overlay(props) {

    return (
        <div id="overlay">
            {(!props.started && !props.setup)
                ? <button id="start" onClick={props.startSetup}>Start Game</button>
                : null
            }
        </div>
    );

}

export default Overlay;