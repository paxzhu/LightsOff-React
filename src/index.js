import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let BlockBlue = '#497bb1';
let BlockBlack = '#131313';
let BOARD_W = 10;
let BOARD_H = 10;

function Square(props) {
    return (
      <button className="square" style={{background: props.background}} onClick={props.onClick}> 
      </button>
    );
}

function getRandomColor() {
  const color = [BlockBlack, BlockBlue];
  const randomNum = Math.random();
  const index = (randomNum < 0.5) ? 0 : 1;
  return color[index];
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array.from({length:BOARD_H}, () => Array(BOARD_W).fill(null).map(() => getRandomColor())),
    };
  }

  handleClick(i, j) {
    const squares = this.state.squares.map((x) => x.slice());
    
    const neis = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];
    for(let index = 0; index < neis.length; index++) {
      const [di, dj] = neis[index];
      const x = i + di, y = j + dj;
      if( 0 <= x && x < squares[0].length &&  0 <= y && y < squares.length) {
        squares[x][y] = (squares[x][y] === BlockBlack) ? BlockBlue : BlockBlack;
      }
    }
    this.setState({
      squares: squares,
    })
  }

  renderSquare(i, j) {
    return <Square background={this.state.squares[i][j]} onClick={() => this.handleClick(i, j) } />;
  }

  render() {
    return (
      <div>
        {Array(BOARD_H).fill(null).map((_, row) => (
          <div key={row} className="board-row">
            {Array(BOARD_W).fill(null).map((_, col) => this.renderSquare(row, col))}
          </div>
        ))}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
