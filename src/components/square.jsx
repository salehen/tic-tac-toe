import React from 'react';

function Square(props){
    return(
        <div className={props.value?'gameButton btnClick':'gameButton'} onClick={props.onClick}>
            {props.value}
        </div>
    )
}

export default Square;