import './Setup.css';

function Setup(props) {

    let index = parseInt(props.id) - 1;

    return (
        <article className={`setup-${props.id} setup-panel`}>
            <input
                id={`setupplayer-${props.id}`}
                name={`player${props.id}-setup`}
                value={props.name}
                onChange={(e) => props.handleChange(e, props.id)}
                placeholder="Enter Name">
            </input>
            <button onClick={() => props.buttonFunc(index)}>Set</button>
        </article>
    );

}

export default Setup;