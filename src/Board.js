import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


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
        rows: 5,
        cols: 5,
        chanceOn: 0.25
    };
    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
  };

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {cols, rows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    let hasWon;


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    return (
        <table className="Board">
            <tbody>
                <tr>
                    <Cell isLit={true} />
                    <Cell isLit={false} />
                    <Cell isLit={true} />
                </tr>
            </tbody>
        </table>
    )
  };
}


export default Board;
