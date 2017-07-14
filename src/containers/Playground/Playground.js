/*eslint-disable*/
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Cell, GameMenu} from '../../components';
import {buildPlayground, expandArea, getGameAttributesByDifficulty} from 'utils/game';

export default class Playground extends Component {
  constructor(props) {
    super(props);


    this.state = this.initialState(getGameAttributesByDifficulty('expert'));

    this.gameAttributes = getGameAttributesByDifficulty('expert');
  }

  //TODO make more idiomatic react?! (use lifecycle methods)
  initialState(gameAttributes) {
    const {height, width, mines} = gameAttributes;
    const bombs = this.generateBombs(gameAttributes);
    return {
      playground: buildPlayground(height, width, bombs),
      bombsCellsLookup: bombs,
      revealedCellsLookup: {},
      markedCellsLookup: {},
      isGameOver: false,
      bombsCount: mines,
      timer: 0,
      intervalId: null,
      showGameMenu: false,
    }
  }

  resetGame = () => {
    clearInterval(this.state.intervalId);
    this.setState(this.initialState(this.gameAttributes));
  }

  generateBombs(gameAttributes) {
    const {height, width, mines} = gameAttributes;
    let bombs = {};
    let row, col;
    while (Object.keys(bombs).length < mines) {
      row = Math.floor(Math.random() * (height));
      col = Math.floor(Math.random() * (width));
      bombs[`${row}_${col}`] = `${row}_${col}`;
    }

    return bombs;
  }

  checkGameStatus(row, col, hasBomb) {
    const {playground, revealedCellsLookup, markedCellsLookup, timer} = this.state;
    const {height, width, mines} = this.gameAttributes;
    let updatedRevealedCells;

    if (hasBomb) {
      this.gameOver();
    } else {
      updatedRevealedCells = expandArea(row, col, playground, revealedCellsLookup, markedCellsLookup);

      if (Object.keys(updatedRevealedCells).length === width*height - mines ) {
        this.gameOver(true);
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

  gameOver(isVictory = false) {
    this.setState({isGameOver: true});
    if (isVictory) {
      console.log('VICTORY!!');
    } else {
      console.log('GAME OVER!');
    }
  }

  openGameMenu = () => {
    this.setState({showGameMenu: true});
  }

  handleApplySettings(gameAttributes) {
    this.gameAttributes = gameAttributes;
    this.resetGame();
  }

  render() {
    const {bombsCellsLookup, revealedCellsLookup, markedCellsLookup, playground, isGameOver, bombsCount, timer, showGameMenu} = this.state;

    console.log(this.gameAttributes);

    //TODO work on this part of code!
    const rows = [];
    for (let row = 0; row < this.gameAttributes.height; row++) {
      for (let col = 0; col < this.gameAttributes.width; col++) {
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
    const gridWidth = this.gameAttributes.width * 15;
    const mainGrid = (
        <div className="main-grid" style={{width: `${gridWidth}px`}}>
          {rows}
          {showGameMenu && <GameMenu handleApplySettings={this.handleApplySettings.bind(this)}/>}
        </div>);

    return (
        <div className="minesweeper-body">
          <Helmet title="Minesweeper" />
          <h1>Bombs: {bombsCount}</h1>
          <h1>Timer: {timer}</h1>
          <div><a className="pointer" onClick={this.openGameMenu}>Game</a></div>
          <button onClick={this.resetGame}>Reset Game</button>
          {mainGrid}
        </div>);
  }
}
