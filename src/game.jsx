import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Board from './board';
import Minimax from './minimax';

export default function Game(props) {

    const handleClick = (event) => {
        const targetSquare = event.target;
        const targetSquareID = targetSquare.getAttribute("id");
        const indexesOfTargetSquare = coordination[targetSquareID];

        if(targetSquare.innerText !== EMPTY){
            setShowWarningModal(!showWarningModal);
        } else{
            if(settings.gameMode === "PvC"){
                targetSquare.innerText = players.user;
                updateBoardState(...indexesOfTargetSquare, players.user);

                if(!minimax.getDepth()){
                    setShowResultModal(!showResultModal);
                } else {
                    const bestMove = minimax.max();
                    updateBoardState(
                        bestMove.row,
                        bestMove.col,
                        players.opponent
                    );

                    if(minimax.isFinished()){
                        setShowResultModal(!showResultModal);
                    }
                }
            } else {
                let countX = 0;
                let countO = 0;
                let turn;

                for(let i=0; i<3; i++){
                    for(let j=0; j<3; j++){
                        if(board[i][j]==="X"){ 
                            countX+=1;
                        }else if(board[i][j]==="O") {
                            countO+=1;
                        }
                    }
                }

                if(!countX && !countO) {
                    turn = "X";
                } else if(countX && !countO){
                    turn = "O";
                } else if(countO===countX){
                    turn = "X";
                }else if(countX > countO){
                    turn = "O";
                }else if(countO > countX){
                    turn = "X";
                }

                updateBoardState(...indexesOfTargetSquare, turn);

                if(minimax.isFinished()){
                    setShowResultModal(!showResultModal);
                }
            }
        }
    };

    const updateBoardState = (row, col, player) => {
        let currentBoard = board;
        currentBoard[row][col] = player;
        setBoard(currentBoard);
        forceUpdate();
    }

    const forceUpdate = React.useReducer(() => ({}))[1];

    const playAgain = () => {
        setShowResultModal(!showResultModal);
        setBoard(initialBoard);
    };

    const closeWarningModal = () => {
        setShowWarningModal(!showWarningModal);
    };

    const EMPTY = "";

    const initialBoard = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
    ];

    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [board, setBoard] = useState(initialBoard);

    
    const settings  = props.settings;
    const players = {
        user: settings.user,
        opponent: settings.user === "X" ? "O" : "X",
    };
    const minimax = new Minimax(board, players);

    const coordination = {
        1: [0, 0],
        2: [0, 1],
        3: [0, 2],
        4: [1, 0],
        5: [1, 1],
        6: [1, 2],
        7: [2, 0],
        8: [2, 1],
        9: [2, 2],
    };
    let modalDatas = {
        title: undefined,
        bodyText: undefined,
    };

    if(showResultModal){
        let finalPoint = minimax.returnValueOfPosition();
        if(finalPoint === 0) {
            modalDatas.title = "Draw";
            modalDatas.bodyText = "Match has ended in draw!";
        }
        if(finalPoint === 1){
            modalDatas.title = "Opponent";
            modalDatas.bodyText = "Opponent has won :(";
        }
        if(finalPoint === -1){
            modalDatas.title = "User";
            modalDatas.bodyText = "You have won :)";
        }
    }

    if(
        settings.gameMode === "PvC" &&
        players.user === "O" &&
        board.toString() === initialBoard.toString()
    ) {
        const bestMove = minimax.max();
        updateBoardState(
            bestMove.row,
            bestMove.col,
            players.opponent
        );
    }

  return (
      <>
      <Modal show={showResultModal}>
          <Modal.Header>
              <Modal.Title>{modalDatas.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>{modalDatas.bodyText}</p>
          </Modal.Body>
          <Modal.Footer>
               <Button variant="secondary" onClick={() => window.location.reload()}>
                   Back to Main Menu.
               </Button>
               <Button onClick={playAgain}>Play Again</Button>
          </Modal.Footer>
      </Modal>

      <Modal show={showWarningModal}>
          <Modal.Header>
              <Modal.Title>Invalid Move!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>You tried to move to already filled spot.</p>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={closeWarningModal}>
                  Close
              </Button>
              <Button onClick={closeWarningModal}>
                  OK
              </Button>
          </Modal.Footer>
      </Modal>
      
      <Board board={board} onClickedToSquare={handleClick} />
      </>
  );
}
