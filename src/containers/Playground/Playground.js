/*eslint-disable*/
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Cell} from '../../components';
import {buildPlayground, expandArea} from 'utils/game';

export default class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState();
  }

  //TODO make more idiomatic react?! (use lifecycle methods)
  initialState() {
    const bombs = this.generateBombs();
    return {
      playground: buildPlayground(16, 30, bombs),
      bombsCellsLookup: bombs,
      revealedCellsLookup: {},
      markedCellsLookup: {},
      isGameOver: false,
      bombsCount: 99,
      timer: 0,
      intervalId: null,
    }
  }

  resetGame = () => {
    clearInterval(this.state.intervalId);
    this.setState(this.initialState());
  }

  generateBombs() {
    let bombs = {};
    let row, col;
    while (Object.keys(bombs).length < 99) {
      row = Math.floor(Math.random() * (15 + 1));
      col = Math.floor(Math.random() * (29 + 1));
      bombs[`${row}_${col}`] = `${row}_${col}`;
    }

    return bombs;
  }

  checkGameStatus(row, col, hasBomb) {
    const {playground, revealedCellsLookup, markedCellsLookup, timer} = this.state;
    let updatedRevealedCells;

    if (hasBomb) {
      this.gameOver();
    } else {
      updatedRevealedCells = expandArea(row, col, playground, revealedCellsLookup, markedCellsLookup);

      if (Object.keys(updatedRevealedCells).length === 30*16 - 99 ) {
        this.gameOver();
      } else {
        this.setState({revealedCellsLookup: updatedRevealedCells});
      }
    }

    if (timer === 0) {
      this.setState({intervalId: this.startTimer(), timer: 1});
    }
  }

  startTimer() {
    return setInterval(this.countUp, 1000);
  }

  countUp = () => {
    const {timer, isGameOver, intervalId} = this.state;
    console.log('COUNTING UP!');
    if (timer < 1000 && !isGameOver) {
      this.setState({timer: timer + 1});
    } else {
      clearInterval(intervalId);
    }
  }

  markCell(event, row, col) {
    event.preventDefault();
    const {revealedCellsLookup, markedCellsLookup, bombsCount} = this.state;
    if (!revealedCellsLookup[`${row}_${col}`]) {
      markedCellsLookup[`${row}_${col}`] = markedCellsLookup[`${row}_${col}`] ? null : `${row}_${col}`;
      this.setState({bombsCount: bombsCount-1, markedCellsLookup: markedCellsLookup});
    }
  }

  gameOver() {
    this.setState({isGameOver: true});
    console.log('GAME OVER!');
  }

  render() {
    const {bombsCellsLookup, revealedCellsLookup, markedCellsLookup, playground, isGameOver, bombsCount, timer} = this.state;

    //TODO work on this part of code!
    const rows = [];
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 30; col++) {
        rows.push(<Cell
                  key={`${row}_${col}`}
                  row={row}
                  col={col}
                  onPlayerClick={this.checkGameStatus.bind(this)}
                  onPlayerMarkCell={this.markCell.bind(this)}
                  hasBomb={bombsCellsLookup[`${row}_${col}`]}
                  bombsAround={playground && playground[row][col] > 0 && playground[row][col] -1}
                  shouldRevealCell={revealedCellsLookup[`${row}_${col}`]}
                  shouldMarkCell={markedCellsLookup[`${row}_${col}`]}
                  isGameOver={isGameOver}
                  />);
      }
    }
    //////////////////////////

    const mainGrid = (<div style={{width: '450px'}}>{rows}</div>);
    return (
        <div>
          <Helmet title="Minesweeper" />
          <h1>{bombsCount}</h1>
          <h1>{timer}</h1>
          <button onClick={this.resetGame}>Reset Game</button>
          {mainGrid}
        </div>);
  }
}
