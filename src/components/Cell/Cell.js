/*eslint-disable*/
import React, { PropTypes } from 'react';

const cellStyles = {
  blank: {
    border: '1px solid black',
    width: '15px',
    height: '15px',
    float: 'left'
  },

  bomb: {
    backgroundColor: 'red',
  },

  revealedNumber: {
    backgroundColor: 'green',
  },

  revealedEmpty: {
    backgroundColor: 'yellow',
  },

  markedCell: {
    backgroundColor: 'brown',
  }
};

//TODO make it functional component
export default function Cell(props) {

  const {hasBomb, row, col, onPlayerClick, onPlayerMarkCell, isGameOver, shouldRevealCell, bombsAround, shouldMarkCell} = props;

  let styles = isGameOver && hasBomb ? {...cellStyles.blank, ...cellStyles.bomb} : cellStyles.blank;
  if (shouldRevealCell) {
    if (bombsAround > 0) {
      styles = {...styles, ...cellStyles.revealedNumber};
    } else {
      styles = {...styles, ...cellStyles.revealedEmpty};
    }
  }
  if (shouldMarkCell) {
    styles = {...styles, ...cellStyles.markedCell};
  }

  return (<div
          style={styles}
          onClick={isGameOver ? null : () => onPlayerClick(row, col, hasBomb) }
          onContextMenu={isGameOver ? null : (event) => { onPlayerMarkCell(event, row, col)}}>
          {shouldRevealCell && bombsAround > 0 && bombsAround}
          </div>);
}

  Cell.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    hasBomb: PropTypes.string,
    shouldRevealCell: PropTypes.string,
    shouldMarkCell: PropTypes.string,
    onPlayerClick: PropTypes.func,
    onPlayerMarkCell: PropTypes.func,
    isGameOver: PropTypes.bool.isRequired,
    bombsAround: PropTypes.number,
  }
