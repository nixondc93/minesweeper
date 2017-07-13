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
  }
};

export default class Cell extends Component {
  static propTypes = {
    hasBomb: PropTypes.string,
    isOpenCell: PropTypes.bool,
    onPlayerClick: PropTypes.func.isRequired,
    isGameOver: PropTypes.bool,
  }

  render() {
    const {hasBomb, onPlayerClick, isGameOver} = this.props;
    const styles = hasBomb ? {...cellStyles.blank, ...cellStyles.bomb} : cellStyles.blank;
    return (<div style={styles} onClick={() => onPlayerClick(hasBomb) }></div>);
  }
}
