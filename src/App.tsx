import React, {useEffect, useState} from 'react';
import './App.css';

// Color Theme
const colors: Map<string, string> = new Map([
    ['available', 'lightgray'],
    ['used', 'lightgreen'],
    ['wrong', 'lightcoral'],
    ['candidate', 'deepskyblue'],
]);


// Math science
const utils = {
    // Sum an array
    sum: (arr: any[]) => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min: number, max: number) => Array.from({length: max - min + 1}, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr: string | any[], max: number) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

type PlayNumberProps = {
    number: number,
    status: string,
    onclick: (number: number, status: string) => void,
}

export class PlayNumber extends React.Component<PlayNumberProps> {
    render() {
        return (
            <button
                key={this.props.number}
                className="number"
                style={{backgroundColor: colors.get(this.props.status)}}
                onClick={() => this.props.onclick(this.props.number, this.props.status)}
            >
                {this.props.number}
            </button>);
    }
}

export class StarsDisplay extends React.Component<{ stars: number }> {
    render() {
        return (
            <>
                {utils.range(1, this.props.stars).map(starId =>
                    <div key={starId} className='star'/>
                )} </>
        );
    }
}

export class PlayAgain extends React.Component<{ onclick: () => void , gameStatus: string}> {
    render() {
        return (
            <div className="game-done">
                <div
                    className="message"
                    style={{color: this.props.gameStatus === 'lost' ? 'red' : 'green'}}
                >
                    {this.props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
                </div>
                <button
                    onClick={this.props.onclick}
                >
                    Play Again
                </button>
            </div>
        );
    }
}

function App() {
    const [gameId, setGameId] = useState(1);

    return <Game
        key={gameId}
        startNewGame={() => setGameId(gameId+1)} />;
}

const Game: React.FC<{startNewGame: () => void}> = () => {

    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
    const [candidateNumbers, setCandidateNumbers] = useState([0]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    const resetGame = () => {
        setCandidateNumbers([]);
        setStars(utils.random(1, 9));
        setAvailableNumbers(utils.range(1, 9));
        setSecondsLeft(10);
    }

    const gameStatus = availableNumbers.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active';

    const candidateAreWrong = () => {
        return utils.sum(candidateNumbers) > stars;
    };

    const numberStatus = (number: number) => {
        if (!availableNumbers.includes(number)) {
            return 'used';
        }
        // @ts-ignore
        if (candidateNumbers.includes(number)) {
            return candidateAreWrong() ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number: number, currentStatus: string) => {
        if (currentStatus === 'used' || gameStatus !== 'active') {
            return;
        }
        const newCandidateNums = currentStatus === 'available'
            ? candidateNumbers.concat(number)
            : candidateNumbers.filter(value => value !== number);
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNumbers(newCandidateNums);
        } else {
            let newAvailableNumbers = availableNumbers.filter(value => !newCandidateNums.includes(value));
            setAvailableNumbers(newAvailableNumbers);
            setCandidateNumbers([]);
            setStars(utils.randomSumIn(newAvailableNumbers, 9));
        }
    }
    useEffect(() => {
        if (secondsLeft > 0 || gameStatus === 'active') {
            let timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000);
            return () => {
                clearTimeout(timerId);
            }
        }
    });

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onclick={resetGame} gameStatus={gameStatus}/>
                    ) : (
                        <StarsDisplay stars={stars}/>
                    )}
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            onclick={onNumberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
}

export default App
