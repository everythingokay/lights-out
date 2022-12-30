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

    createBoard() {
        let board = [];

        for (let y = 0; y < this.props.rows; y++) {
            let row = [];
            for (let x = 0; x < this.props.cols; x++) {
                row.push(Math.random() < this.props.chanceOn)
            };
            board.push(row);
        };

    return board
    };

    flipCellsAround(coord) {
        console.log("FLIPPING", coord)
        let {cols, rows} = this.props;
        let board = this.state.board;
        let [y, x] = coord.split("-").map(Number);

        function flipCell(y, x) {
            if (x >= 0 && x < cols && y >= 0 && y < rows) {
                board[y][x] = !board[y][x];
                };
        };
        flipCell(y, x);
        flipCell(y, x-1);
        flipCell(y, x+1);
        flipCell(y-1, x);
        flipCell(y+1, x);

        let hasWon = false;

        this.setState({ board: board, hasWon: hasWon });
    };

    render() {
        let tableBoard = [];
            for (let y = 0; y < this.props.rows; y++) {
                let row = [];
                for (let x = 0; x < this.props.cols; x++) {
                    let coord = `${y}-${x}`;
                    row.push(<Cell 
                        key={coord} 
                        isLit={this.state.board[y][x]} 
                        flipCellsAroundMe={() => this.flipCellsAround(coord)}
                        />)
                };
                tableBoard.push(<tr key={y}>{row}</tr>)
            };
        return (
            <table className="Board">
                <tbody>
                    <tr>{tableBoard}</tr>
                </tbody>
            </table>
        )
    };
};

export default Board;