import './Setup.css';

function Setup(props) {

    let index = parseInt(props.id) - 1;

    return (
        <td className="input setup-panel">
            <input 
                id={`setupplayer-${props.id}`} 
                name={`player${props.id}-setup`} 
                value={props.name}
                onChange={(e) => props.handleChange(e, props.id)}
                placeholder="Enter Name">
            </input>
            <button onClick={() => props.buttonFunc(index)}>Set</button>
        </td>
    );

}

export default Setup;