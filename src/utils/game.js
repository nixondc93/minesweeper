/* eslint-disable no-loop-func */
const deltas = [
  {row: -1, col: 0}, // top
  {row: -1, col: 1},
  {row: 0, col: 1}, // right
  {row: 1, col: 1},
  {row: 1, col: 0}, // bottom
  {row: 1, col: -1},
  {row: 0, col: -1}, // left
  {row: -1, col: -1}
];

export function getGameAttributesByDifficulty(difficulty) {
  switch (difficulty) {
    case 'beginner':
      return {height: 9, width: 9, mines: 10};
    case 'intermediate':
      return {height: 16, width: 16, mines: 40};
    case 'expert':
      return {height: 16, width: 30, mines: 99};
    default:
      return {height: 20, width: 30, mines: 145};
  }
}

function generateEmptyPlayground(rows, cols) {
  const playground = [];
  for (let count = 0; count < rows; count++) {
    playground.push(new Array(cols).fill(0));
  }

  return playground;
}

function isValidCell(row, col, playground, revealedCellsLookup = null) {
  if (playground[row] && playground[row][col] >= 0) {
    return !revealedCellsLookup || !revealedCellsLookup[`${row}_${col}`];
  }

  return false;
}

export function buildPlayground(height, width, numberOfMines) {
  const playground = generateEmptyPlayground(height, width);
  const cells = Array.from(Array(height * width).keys()); // array with elements from 0 to height * width (number of cells) to generate random mines without repetitions
  let cell;
  let index;
  let row;
  let col;
  let minesPlaced = 0;

  while (minesPlaced < numberOfMines) {
    index = Math.floor(Math.random() * (cells.length - 1));
    cell = cells[index];
    row = Math.floor(cell / width);
    col = cell % width;

    cells.splice(index, 1);

    playground[row][col] = -1;

    deltas.forEach((delta) => {
      if (isValidCell(row + delta.row, col + delta.col, playground)) {
        playground[row + delta.row][col + delta.col]++;
      }
    });

    minesPlaced++;
  }

  return playground;
}

export function expandArea(row, col, playground, revealedCellsLookup, markedCellsLookup) {
  if (!markedCellsLookup[`${row}_${col}`]) {
    if (playground[row][col] >= 0) {
      revealedCellsLookup[`${row}_${col}`] = true;
    }
    if (playground[row][col] === 0) {
      deltas.forEach((delta) => {
        if (isValidCell(row + delta.row, col + delta.col, playground, revealedCellsLookup)) {
          expandArea(row + delta.row, col + delta.col, playground, revealedCellsLookup, markedCellsLookup);
        }
      });
    }
  }

  return revealedCellsLookup;
}
