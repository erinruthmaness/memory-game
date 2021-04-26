import Card from '../Card/Card'
import './Board.css';

function Board(props) {
    return (
        <div className="board">
            {props.bank.map(item => {
                return <Card key={item.id} 
                id={item.id} 
                u1={item.u1} u2={item.u2} 
                name={item.name}
                status={item.status}
                cardClick={props.cardClick}
                turn={props.turn} />
            })}
        </div>
    );

}

export default Board;
