import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';
//HOW TO RESOLVE IT
//https://www.logicgamesonline.com/lightsout/tutorial.html#:~:text=The%20easiest%20way%20to%20solve,are%20in%20the%20final%20row.


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; y++){
      let row = [];
      for (let x = 0; x < this.props.ncols; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("FLIPPING", coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y-1,x);
    flipCell(y,x);
    flipCell(y+1,x);

    flipCell(y,x-1);
    flipCell(y,x+1);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    function gameIsWon (){
      let won = false;
      for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
          if (board[i][j] === true) {
            won = false;
          } else {
            won = true;
          }
        }
      }
      return won;
    }
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
    let winMsg = <div><h1>Congratulations!</h1><h2>You won!</h2></div>;
    let showBoard = <table className="Board">
    <tbody>
      {
        this.state.board.map(
          (y, i) => <tr key={i}>
            {y.map(
              (x, j) => {
                let coord = `${i}-${j}`;
                return <Cell key={coord} isLit={x} flipCellsAroundMe={() => this.flipCellsAround(coord)}/>
              }
            )}
          </tr>
        )
      }
    </tbody>
  </table>;
    // TODO

    // make table board
    return this.state.hasWon ? winMsg : showBoard;

    // TODO
  }
}


export default Board;
