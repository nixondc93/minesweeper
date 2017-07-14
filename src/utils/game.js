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
    playground.push(new Array(cols).fill(1));
  }

  return playground;
}

export function buildPlayground(rows, cols, bombsCellsLookup) {
  const playground = generateEmptyPlayground(rows, cols);
  let row;
  let col;

  Object.keys(bombsCellsLookup).forEach((key) => {
    row = parseInt(key.split('_')[0], 10);
    col = parseInt(key.split('_')[1], 10);
    playground[row][col] = -1;

    // increment all cells around the bomb if it's not another bomb
    if (playground[row - 1]) {
      if (playground[row - 1][col] !== -1) {
        playground[row - 1][col]++;
      }
      if (playground[row - 1][col + 1] && playground[row - 1][col + 1] !== -1 ) {
        playground[row - 1][col + 1]++;
      }
    }

    if (playground[row][col + 1]) {
      if (playground[row][col + 1] !== -1) {
        playground[row][col + 1]++;
      }
      if (playground[row + 1] && playground[row + 1][col + 1] !== -1 ) {
        playground[row + 1][col + 1]++;
      }
    }

    if (playground[row + 1]) {
      if (playground[row + 1][col] !== -1) {
        playground[row + 1][col]++;
      }
      if (playground[row + 1][col - 1] && playground[row + 1][col - 1] !== -1) {
        playground[row + 1][col - 1]++;
      }
    }

    if (playground[row][col - 1]) {
      if (playground[row][col - 1] !== -1) {
        playground[row][col - 1]++;
      }
      if (playground[row - 1] && playground[row - 1][col - 1] !== -1) {
        playground[row - 1][col - 1]++;
      }
    }
  });

  return playground;
}

export function expandArea(row, col, playground, revealedCellsLookup, markedCellsLookup) {
  if (!markedCellsLookup[`${row}_${col}`]) {
    if (playground[row][col] >= 1) {
      revealedCellsLookup[`${row}_${col}`] = `${row}_${col}`;
    }
    if (playground[row][col] === 1) {
      if (playground[row - 1] && !revealedCellsLookup[`${row - 1}_${col}`]) {
        expandArea(row - 1, col, playground, revealedCellsLookup, markedCellsLookup);
      }
      if (playground[row][col + 1] && !revealedCellsLookup[`${row}_${col + 1}`]) {
        expandArea(row, col + 1, playground, revealedCellsLookup, markedCellsLookup);
      }
      if (playground[row + 1] && !revealedCellsLookup[`${row + 1}_${col}`]) {
        expandArea(row + 1, col, playground, revealedCellsLookup, markedCellsLookup);
      }
      if (playground[row][col - 1] && !revealedCellsLookup[`${row}_${col - 1}`]) {
        expandArea(row, col - 1, playground, revealedCellsLookup, markedCellsLookup);
      }
    }
  }

  return revealedCellsLookup;
}
