/*eslint-disable*/
import React, { Component, PropTypes } from 'react';

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
export default class Cell extends Component {
  static propTypes = {
    hasBomb: PropTypes.string,
    shouldRevealCell: PropTypes.string,
    shouldMarkCell: PropTypes.string,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    onPlayerClick: PropTypes.func,
    onPlayerMarkCell: PropTypes.func,
    isGameOver: PropTypes.bool.isRequired,
    bombsAround: PropTypes.number,
  }

  render() {
    const {hasBomb, row, col, onPlayerClick, onPlayerMarkCell, isGameOver, shouldRevealCell, bombsAround, shouldMarkCell} = this.props;
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
              {shouldRevealCell && this.props.bombsAround > 0 && this.props.bombsAround}
            </div>);
  }
}
