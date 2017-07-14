/*eslint-disable*/
export function getBackgroundByNumber(mines) {
  switch(mines) {
    case 1:
      return {background: 'url(sprite100.gif) -16px 68px'};
    case 2:
      return {background: 'url(sprite100.gif) -32px 68px'};
    case 3:
      return {background: 'url(sprite100.gif) -48px 68px'};
    case 4:
      return {background: 'url(sprite100.gif) -64px 68px'};
    case 5:
      return {background: 'url(sprite100.gif) -80px 68px'};
    case 6:
      return {background: 'url(sprite100.gif) -96px 68px'};
    case 7:
      return {background: 'url(sprite100.gif) -112px 68px'};
    default:
      return {background: 'url(sprite100.gif) -128px 68px'};
  }
}

export function getGameAttributesByDifficulty(difficulty) {
  switch(difficulty) {
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
  let playground = [];
  for (let i = 0; i < rows; i++) {
    playground.push(new Array(cols).fill(1));
  }

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
