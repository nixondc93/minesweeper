/*eslint-disable*/
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Cell} from '../../components';
import {buildPlayground, expandArea} from 'utils/game';

export default class Playground extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      playground: null,
      bombsCellsLookup: this.generateBombs(),
      revealedCellsLookup: {},
      markedCellsLookup: {},
      isGameOver: false,
    }
  }

  componentDidMount() {
    const {bombsCellsLookup} = this.state;
    this.setState({playground: buildPlayground(16, 30, bombsCellsLookup)});
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
    const {playground, revealedCellsLookup, markedCellsLookup} = this.state;
    if (hasBomb) {
      this.gameOver();
    } else {
      this.setState({revealedCellsLookup: expandArea(row, col, playground, revealedCellsLookup, markedCellsLookup)});
    }
  }

  markCell(event, row, col) {
    event.preventDefault();
    const {revealedCellsLookup, markedCellsLookup} = this.state;
    if (!revealedCellsLookup[`${row}_${col}`]) {
      markedCellsLookup[`${row}_${col}`] = markedCellsLookup[`${row}_${col}`] ? null : `${row}_${col}`;
      this.setState({markedCellsLookup});
    }
  }

  gameOver() {
    this.setState({isGameOver: true});
    console.log('GAME OVER!');
  }

  render() {
    const {bombsCellsLookup, revealedCellsLookup, markedCellsLookup, playground, isGameOver} = this.state;

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
          <h1>PLAYGROUND!</h1>
          {mainGrid}
        </div>);
  }
}
