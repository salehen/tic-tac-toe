import React from 'react';
import Square from './square';

function Board(props) {

    const renderSquare = i => <Square
        value={props.square[i]}
        onClick={() => props.onClick(i)}
    />
    return (
        <div className='fr'>
            <div className='row'>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className='row'>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className='row'>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

export default Board;