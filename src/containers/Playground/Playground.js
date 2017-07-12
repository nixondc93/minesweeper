import React, { Component } from 'react';
// import config from '../../config';
import Helmet from 'react-helmet';

export default class Playground extends Component {
  render() {
    return (
        <div>
          <Helmet title="Minesweeper" />
          <h1>PLAYGROUND!</h1>
        </div>);
  }
}
