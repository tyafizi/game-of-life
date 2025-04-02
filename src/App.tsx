import { useEffect, useState } from "react";
import { Cell } from "./components/Cell";
import { gameOfLife } from "./game";

function createBoard(
  rows: number,
  cols: number,
  random: boolean = false,
): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      random ? (Math.random() > 0.5 ? 1 : 0) : 0,
    ),
  );
}

function calculateRows(cols: number) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const cellSize = screenWidth / cols;
  const rows = Math.floor(screenHeight / cellSize); // Ensure it fits

  return rows;
}

function App() {
  let cols = 50;
  if (window.innerWidth < 840) {
    cols = 15;
  } else if (window.innerWidth < 1252) {
    cols = 25;
  }
  const rows = calculateRows(cols);

  const [gamePaused, setGamePaused] = useState(true);
  const [board, setBoard] = useState<number[][]>(
    createBoard(rows, cols, false),
  );

  useEffect(() => {
    if (gamePaused) return;

    const interval = setInterval(() => {
      setBoard((board) => {
        return gameOfLife(board);
      });
      // TODO: handle situation when all cells are dead
    }, 100);
    return () => clearInterval(interval);
  }, [gamePaused]);

  return (
    <>
      <div className="flex justify-center gap-4">
        <button
          className="my-2 block"
          onClick={() => setGamePaused((prev) => !prev)}
        >
          {gamePaused ? "Continue the game" : "Pause the game"}
        </button>
        <button
          className="my-2 block"
          onClick={() => {
            setBoard(createBoard(rows, cols, false));
            setGamePaused(true);
          }}
        >
          Clear the board
        </button>
      </div>
      <div className="h-full grow flex flex-col">
        {board.map((row, m) => (
          <div key={m} className="flex w-full grow items-stretch">
            {row.map((cell, n) => (
              <Cell
                key={n}
                alive={Boolean(cell)}
                onClick={() => {
                  setBoard((board) => {
                    board[m][n] = 1;
                    return [...board];
                  });
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
