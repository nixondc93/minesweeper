/*eslint-disable*/
import React, { PropTypes } from 'react';
import {getBackgroundByNumber} from 'utils/game';

//TODO use classnames instead
const cellStyles = {
  blank: {
    width: '15px',
    height: '15px',
    float: 'left',
    background: 'url(sprite100.gif) 0 52px',
  },

  mine: {
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

  const {hasMine, row, col, onPlayerClick, onPlayerMarkCell, isGameOver, shouldRevealCell, minesAround, shouldMarkCell, hasMineAndPressed} = props;
  let styles = cellStyles.blank;

  if (isGameOver && hasMine) {
    if (hasMineAndPressed) {
      styles = {...cellStyles.blank, ...cellStyles.pressedMine};
    } else {
      styles = {...cellStyles.blank, ...cellStyles.mine};
    }
  }

  if (shouldRevealCell) {
    if (minesAround > 0) {
      styles = {...styles, ...getBackgroundByNumber(minesAround)};
    } else {
      styles = {...styles, ...cellStyles.revealedEmpty};
    }
  }
  if (shouldMarkCell) {
    styles = {...styles, ...cellStyles.markedCell};
  }

  return (<div
          style={styles}
          onClick={isGameOver ? null : () => onPlayerClick(row, col, hasMine) }
          onContextMenu={isGameOver ? null : (event) => { onPlayerMarkCell(event, row, col)}}>
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
  }
