import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const BlockBlue = '#497bb1';
const BlockBlack = '#131313';
const bgcolor = [BlockBlack, BlockBlue]
let BOARD_W = 10;
let BOARD_H = 10;

function Square(props) {
    return (
      <button className={props.lightoff ? "square-dark" : "square-light"}  onClick={props.onClick}> 
      </button>
    );
}

function getRandomNum() {
  const randomNum = Math.random();
  const num = (randomNum < 0.5) ? 0 : 1;
  return num
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array.from({length:BOARD_H}, () => Array(BOARD_W).fill(null).map(() => getRandomNum())),
    };
  }

  handleClick(i, j) {
    const squares = this.state.squares.map((x) => x.slice());
    
    const neis = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];
    for(let index = 0; index < neis.length; index++) {
      const [di, dj] = neis[index];
      const x = i + di, y = j + dj;
      if( 0 <= x && x < squares[0].length &&  0 <= y && y < squares.length) {
        squares[x][y] = (squares[x][y] === 0) ? 1 : 0;
      }
    }
    this.setState({
      squares: squares,
    })
  }

  renderSquare(i, j) {
    return <Square lightoff={this.state.squares[i][j]} onClick={() => this.handleClick(i, j) } />;
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
