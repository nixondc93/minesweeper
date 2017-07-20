import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default function Cell(props) {
  const {hasMine, indx, onPlayerClick, onPlayerMarkCell, isGameOver, shouldRevealCell, minesAround, shouldMarkCell, hasMineAndPressed} = props;

  const cellClasses = classnames('cell0', {
    'cell-mine': isGameOver && hasMine && !hasMineAndPressed,
    'cell-mine-pressed': isGameOver && hasMine && hasMineAndPressed,
    'cell-mine-wrong-marked': isGameOver && !hasMine && shouldMarkCell,
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
          onClick={isGameOver ? null : () => onPlayerClick(indx, hasMine) }
          onContextMenu={isGameOver ? null : (event) => { onPlayerMarkCell(event, indx);}}>
          </div>);
}

Cell.propTypes = {
  indx: PropTypes.number.isRequired,
  hasMine: PropTypes.bool,
  hasMineAndPressed: PropTypes.bool.isRequired,
  shouldRevealCell: PropTypes.bool,
  shouldMarkCell: PropTypes.bool,
  onPlayerClick: PropTypes.func,
  onPlayerMarkCell: PropTypes.func,
  isGameOver: PropTypes.bool.isRequired,
  minesAround: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};
