import {shuffle} from 'lodash';

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

function isCellAround(indx, currIndx, height, width, playground, revealedCellsLookup = null) {
  return indx >= 0 &&
         indx < width * height &&
         indx !== currIndx && playground[indx] >= 0 &&
         (!revealedCellsLookup || !revealedCellsLookup[indx]) &&
         Math.abs(Math.floor(indx / width) - Math.floor(currIndx / width)) <= 1 &&
         Math.abs(indx % width - currIndx % width) <= 1;
}

export function buildPlayground(height, width, numberOfMines) {
  const playground = new Array(height * width).fill(0);
  const cells = shuffle(Array.from(Array(height * width).keys())); // array with elements from 0 to height * width (number of cells) to generate random mines without repetitions
  let cell;
  let minesPlaced = 0;

  while (minesPlaced < numberOfMines) {
    cell = cells[minesPlaced];

    playground[cell] = -1;

    for (let indx = cell - width - 1; indx <= cell + width + 1; indx++) {
      if (isCellAround(indx, cell, height, width, playground)) {
        playground[indx]++;
      }
    }

    minesPlaced++;
  }

  return playground;
}

export function expandArea(currIndx, playground, height, width, revealedCellsLookup, markedCellsLookup) {
  if (!markedCellsLookup[currIndx]) {
    if (playground[currIndx] >= 0) {
      revealedCellsLookup[currIndx] = true;
    }
    if (playground[currIndx] === 0) {
      for (let indx = currIndx - width - 1; indx < currIndx + width + 1; indx++) {
        if (isCellAround(indx, currIndx, height, width, playground, revealedCellsLookup)) {
          expandArea(indx, playground, height, width, revealedCellsLookup, markedCellsLookup);
        }
      }
    }
  }

  return revealedCellsLookup;
}
