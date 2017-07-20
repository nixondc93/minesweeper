import React, { Component } from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import {Cell, GameMenu} from '../../components';
import {buildPlayground, expandArea, getGameAttributesByDifficulty} from 'utils/game';

export default class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState(getGameAttributesByDifficulty('expert'));

    this.gameAttributes = getGameAttributesByDifficulty('expert');
  }

  onPlayerClick(indx, hasMine) {
    const {playground, markedCellsLookup, timer} = this.state;
    const revealedCellsLookup = Object.assign({}, this.state.revealedCellsLookup);

    if (hasMine) {
      this.gameOver(revealedCellsLookup, indx);
    } else {
      // value of revealedCellsLookup is changed inside of expandArea function as it's passed as a reference
      expandArea(indx, playground, this.gameAttributes.height, this.gameAttributes.width, revealedCellsLookup, markedCellsLookup);

      if (this.checkIfWinningCombination(revealedCellsLookup, markedCellsLookup)) {
        this.gameOver(revealedCellsLookup);
      } else {
        this.setState({revealedCellsLookup});
      }
    }

    if (timer === 0) {
      this.setState({intervalId: this.startTimer(), timer: 1});
    }
  }

  initialState(gameAttributes) {
    const {height, width, mines} = gameAttributes;
    return {
      playground: buildPlayground(height, width, mines),
      revealedCellsLookup: {},
      markedCellsLookup: {},
      isGameOver: false,
      pressedMineIndx: null,
      minesCount: mines,
      timer: 0,
      intervalId: null,
      showGameMenu: false,
    };
  }

  resetGame = () => {
    clearInterval(this.state.intervalId);
    this.setState(this.initialState(this.gameAttributes));
  }

  checkIfWinningCombination = (revealedCellsLookup, markedCellsLookup) => {
    const {height, width, mines} = this.gameAttributes;
    return Object.keys(revealedCellsLookup).length === width * height - mines && Object.keys(markedCellsLookup).length === mines;
  }

  startTimer() {
    return setInterval(this.countUp, 1000);
  }

  countUp = () => {
    const {timer, isGameOver, intervalId} = this.state;
    if (timer < 1000 && !isGameOver) {
      this.setState({timer: timer + 1});
    } else {
      clearInterval(intervalId);
    }
  }

  markCell(event, indx) {
    event.preventDefault();
    const {revealedCellsLookup} = this.state;
    const markedCellsLookup = Object.assign({}, this.state.markedCellsLookup);
    let {minesCount} = this.state;

    if (!revealedCellsLookup[indx]) {
      if (markedCellsLookup[indx]) {
        delete markedCellsLookup[indx];
        minesCount++;
      } else if (minesCount > 0) {
        markedCellsLookup[indx] = true;
        minesCount--;
      }

      if (this.checkIfWinningCombination(revealedCellsLookup, markedCellsLookup)) {
        this.gameOver(revealedCellsLookup);
      } else {
        this.setState({minesCount, markedCellsLookup});
      }
    }
  }

  gameOver(revealedCellsLookup, indx = null) {
    this.setState({isGameOver: true, pressedMineIndx: indx, revealedCellsLookup});
  }

  openGameMenu = () => {
    this.setState({showGameMenu: true});
  }

  closeGameMenu = () => {
    this.setState({showGameMenu: false});
  }

  handleApplySettings(gameAttributes) {
    this.gameAttributes = gameAttributes;
    this.resetGame();
  }

  render() {
    const {revealedCellsLookup, markedCellsLookup, playground, isGameOver, minesCount, timer, showGameMenu, pressedMineIndx} = this.state;

    const rows = [];
    for (let indx = 0; indx < this.gameAttributes.height * this.gameAttributes.width; indx++) {
      rows.push(<Cell
                key={`${indx}`}
                indx={indx}
                onPlayerClick={this.onPlayerClick.bind(this)}
                onPlayerMarkCell={this.markCell.bind(this)}
                hasMine={playground[indx] === -1}
                minesAround={playground[indx] >= 0 && playground[indx]}
                hasMineAndPressed={pressedMineIndx === indx}
                shouldRevealCell={revealedCellsLookup[indx]}
                shouldMarkCell={markedCellsLookup[indx]}
                isGameOver={isGameOver}
                />);
    }

    // 15px is the width of each cell
    const gridWidth = this.gameAttributes.width * 15;
    const mainGrid = (
        <div className="main-grid" style={{width: `${gridWidth}px`}}>
          {rows}
          {showGameMenu && <GameMenu handleApplySettings={this.handleApplySettings.bind(this)} handleExitMenu={this.closeGameMenu.bind(this)} gameAttributes={this.gameAttributes}/>}
        </div>);

    const resetButtonCl = classnames('reset-button', 'pointer', {
      'reset-button-ok': !isGameOver,
      'reset-button-lost': isGameOver && pressedMineIndx !== null,
      'reset-button-won': isGameOver && pressedMineIndx === null
    });

    return (
        <div className="minesweeper-body">
          <Helmet title="Minesweeper Online" />
          <div className="row">
            <h1 className="col-xs-6">Mines: {minesCount}</h1>
            <h1 className="col-xs-6">Timer: {timer}</h1>
          </div>
          <div><a className="pointer" onClick={this.openGameMenu}>Game</a></div>
          <hr />
          <div className={resetButtonCl} onClick={this.resetGame}></div>
          {mainGrid}
        </div>);
  }
}
