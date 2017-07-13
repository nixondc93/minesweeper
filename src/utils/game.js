/*eslint-disable*/
export function generateEmptyPlayground(rows, cols) {
  let playground = [];
  for (let i = 0; i < rows; i++) {
    playground.push(new Array(cols));
  }

  return playground;
}

export function buildPlayground(rows, cols, bombsCellsLookup) {
  const playground = generateEmptyPlayground(rows, cols);
  let i, j;
  Object.keys(bombsCellsLookup).forEach((key) => {
    i = parseInt(key.split('_')[0]);
    j = parseInt(key.split('_')[1]);

    playground[i][j] = '*';
  });

  return playground;
}
