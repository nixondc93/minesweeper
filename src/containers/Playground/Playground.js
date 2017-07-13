/*eslint-disable*/
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Cell} from '../../components';
import {buildPlayground} from 'utils/game';

export default class Playground extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      playground: null,
      bombsCellsLookup: this.generateBombs(),
      revealedCellsLookup: {},
      isGameOver: false,
    }
  }

  componentDidMount() {
    const {bombsCellsLookup} = this.state;
    buildPlayground(16, 30, bombsCellsLookup);
    this.setState({playground: buildPlayground(16, 30, bombsCellsLookup)});
  }

  //TODO MAKE EXACT NUMBER OF BOMBS
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

  expandArea(hasBomb) {
    if (hasBomb) {
      this.gameOver();
    } else {

    }
  }

  gameOver() {
    this.setState({isGameOver: true});
  }

  render() {
    const {bombsCellsLookup, playground, isGameOver} = this.state;
    //TODO work on this part of code!
    // console.log(bombsCellsLookup);
    // console.log(Object.keys(bombsCellsLookup).length);
    console.log(this.state.playground);
    const rows = [];
    for (let row = 0; row < 16; row++) {
      // const currRow = [];
      for (let col = 0; col < 30; col++) {
        rows.push(<Cell
                  key={`${row}_${col}`} id={`${row}_${col}`}
                  onPlayerClick={!isGameOver && this.expandArea.bind(this)}
                  hasBomb={bombsCellsLookup[`${row}_${col}`]}
                  isOpenCell={playground && playground[row][col] === 0}
                  isGameOver={isGameOver}
                  />);
      }
      // rows.push(<div key={`${row}`}>{currRow}</div>);
      // rows.push(<br />);
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
