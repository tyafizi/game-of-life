function checkNeighborsNumber(
  board: number[][],
  cellIndex: [number, number],
): number {
  const [m, n] = cellIndex;

  let neighborsAmount = 0;
  const neighbors = [
    [m - 1, n - 1],
    [m - 1, n],
    [m - 1, n + 1],
    [m, n - 1],
    [m, n + 1],
    [m + 1, n - 1],
    [m + 1, n],
    [m + 1, n + 1],
  ];
  neighbors.forEach(([m, n]) => {
    if (Array.isArray(board[m]) && board[m][n] === 1) {
      neighborsAmount++;
    }
  });

  return neighborsAmount;
}

export function gameOfLife(board: number[][]): number[][] {
  const rows = board.length;
  const columns = board[0].length;
  const newGenBoard: number[][] = Array.from({ length: rows }, () =>
    new Array(columns).fill(0),
  );
  for (let m = 0; m < rows; m++) {
    for (let n = 0; n < columns; n++) {
      const neighborsNumber = checkNeighborsNumber(board, [m, n]);
      if (neighborsNumber < 2) {
        newGenBoard[m][n] = 0;
      } else if (neighborsNumber === 2) {
        newGenBoard[m][n] = board[m][n];
      } else if (neighborsNumber === 3) {
        newGenBoard[m][n] = 1;
      } else if (neighborsNumber > 3) {
        newGenBoard[m][n] = 0;
      }
    }
  }
  return newGenBoard;
}
