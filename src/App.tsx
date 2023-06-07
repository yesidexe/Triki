import React from "react"
import { IconCircle, IconXMark } from "./components/Icons"
import Square from "./components/Square"
import { checkEndGame, checkWinner } from "./utils/index"
import WinnerModal from "./components/WinnerModal";
import confetti from "canvas-confetti"
import {saveLocalStorage} from "./utils/localStorage/index"

type Turns = {
  x: string;
  o: string;
};

const turns: Turns = {
  x: '<IconXMark />',
  o: '<IconCircle />'
}

function App() {
  const [turn, setTurn] = React.useState<string>(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : turns.x
  });

  const [board, setBoard] = React.useState<(string | null)[]>(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  }
  );

  const [winner, setWinner] = React.useState<string | boolean | null>(null)

  const updateBoard = (index: number) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === turns.x ? turns.o : turns.x;
    setTurn(newTurn)
    //guardadr
    saveLocalStorage(newBoard,newTurn)
    //revisar ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    if (checkEndGame(newBoard)) return setWinner(false)
  }

  const resetGame = () => {
    setTurn(turns.x);
    setBoard(Array(9).fill(null));
    setWinner(null);
  }

  return (
    <main>
      <h1 className="w-full h-full text-center my-10 text-5xl font-bold text-neutral-300">Triki</h1>
      <section className="flex flex-col items-center w-full gap-5">
        <button onClick={resetGame} className="text-neutral-100 border-neutral-800 bg-neutral-900 md:text-xl rounded-lg py-2 px-4 md:py-3 md:px-5">Reset game</button>
        <div className="text-white grid grid-cols-3 gap-3">
          {
            board.map((bor, index) => {
              return (
                <Square
                  index={index}
                  key={index}
                  updateBoard={updateBoard}>
                  {bor && bor==='<IconCircle />'?<IconCircle />:(bor==='<IconXMark />'?<IconXMark />:null)}
                </Square>
              )
            })
          }
        </div>
        <div className="flex gap-5">
          <span
            className={`${turn === turns.x && 'bg-neutral-900'} grid place-content-center w-14 h-14 md:w-20 md:h-20 border-2 rounded-lg border-neutral-900`}>
            <IconXMark />
          </span>
          <span className={`${turn === turns.o && 'bg-neutral-900'} grid place-content-center w-14 h-14 md:w-20 md:h-20 border-2 rounded-lg border-neutral-900`}>
            <IconCircle />
          </span>
        </div>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
