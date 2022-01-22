import React from 'react';
import Square from './Square';

function Board(props) {

    const board = props.board;

    return (
        <div id="board">
            <Square id="1" onClick={props.onClickedToSquare} value={board[0][0]} />
            <Square id="2" onClick={props.onClickedToSquare} value={board[0][1]} />
            <Square id="3" onClick={props.onClickedToSquare} value={board[0][2]} />

            <Square id="4" onClick={props.onClickedToSquare} value={board[1][0]} />
            <Square id="5" onClick={props.onClickedToSquare} value={board[1][1]} />
            <Square id="6" onClick={props.onClickedToSquare} value={board[1][2]} />

            <Square id="7" onClick={props.onClickedToSquare} value={board[2][0]} />
            <Square id="8" onClick={props.onClickedToSquare} value={board[2][1]} />
            <Square id="9" onClick={props.onClickedToSquare} value={board[2][2]} />
        </div>
    )
}

export default Board;