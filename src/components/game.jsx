import React from 'react';
import Board from './board';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a]
        }
    }
    return null
}

class Game extends React.Component {
    state = {
        history: [{ squares: Array(9).fill(null) }],
        stepCounter: 0,
        xIsNext: true,
    }
    clickHandler = i => {
        const history = this.state.history.slice(0, this.state.stepCounter + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{ squares }]),
            stepCounter: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo = step => {
        this.setState({
            stepCounter: step,
            xIsNext: step % 2 == 0
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepCounter]
        const winner = calculateWinner(current.squares)
        const moves = history.map((_, move) => {
            const desc = move ? 'Go To Move #' + move : 'Reset Game';
            return (
                <li key={move}>
                    <button className='move-btn' onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        let status = ''
        let win = false
        if (winner) {
            if (winner == 'X') {
                status = 'Winner - Player One (X).'
            }else{
                status = 'Winner - Player Two (O).'
            }
            win = true            
        } else {
            status = 'Next Player - ' + (this.state.xIsNext ? 'Player One (X)' : 'Player Two (O)')
        }
        return (
            <div className='game'>
                <h3>The Ultimate Game</h3>
                <div className='game-board'>
                    <Board
                        square={current.squares}
                        onClick={this.clickHandler}
                    />
                </div>
                <div className='game-info'>
                    <div className={win?'win status':'status'}>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default Game;