import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

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

        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({ board: board, hasWon: hasWon });
    };

    makeTable() {
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
            <table className='Board'>
                <tbody>{tableBoard}</tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
            {this.state.hasWon ? (
              <div className='winner'>
                <span className='neon-orange'>YOU</span>
                <span className='neon-blue'>WIN!</span>
              </div>
            ) : (
              <div>
                <div className='Board-title'>
                  <div className='neon-orange'>Lights</div>
                  <div className='neon-blue'>Out</div>
                </div>
                {this.makeTable()}
              </div>
            )}
          </div>
        )
    };
};

export default Board;