import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Cell(props) {
  const {hasMine, row, col, onPlayerClick, onPlayerMarkCell, isGameOver, shouldRevealCell, minesAround, shouldMarkCell, hasMineAndPressed} = props;

  const cellClasses = classnames('cell0', {
    'cell-mine': isGameOver && hasMine && !hasMineAndPressed,
    'cell-mine-pressed': isGameOver && hasMine && hasMineAndPressed,
    'cell0-revealed': !minesAround && shouldRevealCell,
    'cell1': minesAround === 1 && shouldRevealCell,
    'cell2': minesAround === 2 && shouldRevealCell,
    'cell3': minesAround === 3 && shouldRevealCell,
    'cell4': minesAround === 4 && shouldRevealCell,
    'cell5': minesAround === 5 && shouldRevealCell,
    'cell6': minesAround === 6 && shouldRevealCell,
    'cell7': minesAround === 7 && shouldRevealCell,
    'cell8': minesAround === 8 && shouldRevealCell,
    'flag': shouldMarkCell,
  });

  return (<div
          className={cellClasses}
          onClick={isGameOver ? null : () => onPlayerClick(row, col, hasMine) }
          onContextMenu={isGameOver ? null : (event) => { onPlayerMarkCell(event, row, col);}}>
          </div>);
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  hasMine: PropTypes.string,
  hasMineAndPressed: PropTypes.bool.isRequired,
  shouldRevealCell: PropTypes.string,
  shouldMarkCell: PropTypes.string,
  onPlayerClick: PropTypes.func,
  onPlayerMarkCell: PropTypes.func,
  isGameOver: PropTypes.bool.isRequired,
  minesAround: PropTypes.number,
};
