import './Card.css';


function Card(props) {

    

    return (
        <div className="card-wrapper">
            <article className={`card ${props.name} ${props.status}`} id={props.id} 
            onClick={() => props.cardClick(props.id, props.status, props.name)}>
                <span className="img">{String.fromCharCode(props.u1, props.u2)}</span>
            </article>
        </div>
    );
}

export default Card;
