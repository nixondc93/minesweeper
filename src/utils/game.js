/*eslint-disable*/
export function getGameAttributesByDifficulty(difficulty) {
  switch(difficulty) {
    case 'beginner':
      return {height: 9, width: 9, mines: 10};
    case 'intermediate':
      return {height: 16, width: 16, mines: 40};
    default:
      return {height: 16, width: 30, mines: 99};
  }
}

function generateEmptyPlayground(rows, cols) {
  let playground = [];
  for (let i = 0; i < rows; i++) {
    playground.push(new Array(cols).fill(1));
  }

  console.log(playground);
  console.log(playground.toString());
  return playground;
}

export function buildPlayground(rows, cols, bombsCellsLookup) {
  const playground = generateEmptyPlayground(rows, cols);
  let i, j;

  Object.keys(bombsCellsLookup).forEach((key) => {
    i = parseInt(key.split('_')[0]);
    j = parseInt(key.split('_')[1]);
    playground[i][j] = -1;

    if (playground[i-1]) {
      if (playground[i-1][j] !== -1) {
        playground[i-1][j]++;
      }
      if (playground[i-1][j+1] && playground[i-1][j+1] !== -1 ) {
        playground[i-1][j+1]++;
      }
    }

    if (playground[i][j+1]) {
      if (playground[i][j+1] !== -1) {
        playground[i][j+1]++;
      }
      if (playground[i+1] && playground[i+1][j+1] !== -1 ) {
        playground[i+1][j+1]++;
      }
    }

    if (playground[i+1]) {
      if (playground[i+1][j] !== -1) {
        playground[i+1][j]++;
      }
      if (playground[i+1][j-1] && playground[i+1][j-1] !== -1) {
        playground[i+1][j-1]++;
      }
    }

    if (playground[i][j-1]) {
      if (playground[i][j-1] !== -1) {
        playground[i][j-1]++;
      }
      if(playground[i-1] && playground[i-1][j-1] !== -1) {
        playground[i-1][j-1]++;
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
      if (playground[row-1] && !revealedCellsLookup[`${row-1}_${col}`])
        expandArea(row-1, col, playground, revealedCellsLookup, markedCellsLookup)
      if (playground[row][col+1] && !revealedCellsLookup[`${row}_${col+1}`])
        expandArea(row, col+1, playground, revealedCellsLookup, markedCellsLookup)
      if (playground[row+1] && !revealedCellsLookup[`${row+1}_${col}`])
        expandArea(row+1, col, playground, revealedCellsLookup, markedCellsLookup)
      if (playground[row][col-1] && !revealedCellsLookup[`${row}_${col-1}`])
        expandArea(row, col-1, playground, revealedCellsLookup, markedCellsLookup)
    }
  }

  return revealedCellsLookup;
}
