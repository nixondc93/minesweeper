/*eslint-disable*/
import React, { PropTypes } from 'react';
import {getBackgroundByNumber} from 'utils/game';

const cellStyles = {
  blank: {
    width: '15px',
    height: '15px',
    float: 'left',
    background: 'url(sprite100.gif) 0 52px',
  },

  bomb: {
    background: 'url(sprite100.gif) -64px 52px',
  },

  pressedMine: {
    background: 'url(sprite100.gif) -33px 52px',
  },

  revealedEmpty: {
    background: 'url(sprite100.gif) 0 68px',
  },

  markedCell: {
    background: 'url(sprite100.gif) -16px 52px',
  }
};

export default function Cell(props) {

  const {hasBomb, row, col, onPlayerClick, onPlayerMarkCell, isGameOver, shouldRevealCell, bombsAround, shouldMarkCell, hasMineAndPressed} = props;
  let styles = cellStyles.blank;

  if (isGameOver && hasBomb) {
    if (hasMineAndPressed) {
      styles = {...cellStyles.blank, ...cellStyles.pressedMine};
    } else {
      styles = {...cellStyles.blank, ...cellStyles.bomb};
    }
  }

  if (shouldRevealCell) {
    if (bombsAround > 0) {
      styles = {...styles, ...getBackgroundByNumber(bombsAround)};
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
          </div>);
}

  Cell.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    hasBomb: PropTypes.string,
    hasMineAndPressed: PropTypes.bool.isRequired,
    shouldRevealCell: PropTypes.string,
    shouldMarkCell: PropTypes.string,
    onPlayerClick: PropTypes.func,
    onPlayerMarkCell: PropTypes.func,
    isGameOver: PropTypes.bool.isRequired,
    bombsAround: PropTypes.number,
  }
