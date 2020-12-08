import React from 'react';
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
    range: (min:number, max:number) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min:number, max:number) => min + Math.floor(Math.random() * (max - min + 1)),

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

export class PlayNumber extends React.Component<PlayNumberProps>{
    render() {
        return (
            <button
                key={this.props.number}
                className="number"
                style={{backgroundColor: colors.get(this.props.status) }}
                onClick= {() => this.props.onclick(this.props.number, this.props.status)}
            >
                {this.props.number}
            </button>);
    }
}

export class StarsDisplay extends React.Component<{stars: number}> {
    render() {
        return (
            <>
            {utils.range(1, this.props.stars).map(starId =>
                    <div key={starId} className='star'/>
                )} </>
        );
    }
}

export class App extends React.Component {

    state = {
        stars: utils.random(1,9),
        availableNumbers: utils.range(1,9),
        candidateNumbers: [0] ,
    };

    constructor(props: {}) {
        super(props);
        this.onNumberClick = this.onNumberClick.bind(this);
        this.candidateAreWrong = this.candidateAreWrong.bind(this);
        this.numberStatus = this.numberStatus.bind(this);
    }

    candidateAreWrong() {
        return utils.sum(this.state.candidateNumbers) > this.state.stars;
    };

    numberStatus(number: number) {
        if (!this.state.availableNumbers.includes(number)) {
            return 'used';
        }
        // @ts-ignore
        if (this.state.candidateNumbers.includes(number)) {
            return this.candidateAreWrong() ? 'wrong': 'candidate';
        }
        return 'available';
    };

    onNumberClick(number: number, currentStatus: string) {
        if (currentStatus === 'used') {
            return;
        }
        const newCandidateNums = currentStatus === 'available'
            ? this.state.candidateNumbers.concat(number)
            : this.state.candidateNumbers.filter(value => value !== number);
        if (utils.sum(newCandidateNums) !== this.state.stars) {
            this.setState({
                candidateNumbers: newCandidateNums
            })
        } else {
            let newAvailableNumbers = this.state.availableNumbers.filter(value => !newCandidateNums.includes(value));
            this.setState({
                availableNumbers: newAvailableNumbers,
                candidateNumbers: [],
                stars: utils.randomSumIn(newAvailableNumbers, 9)
            })
        }
    }

    render() {
        return (
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        <StarsDisplay stars={this.state.stars} />
                    </div>
                    <div className="right">
                        {utils.range(1, 9).map(number =>
                            <PlayNumber
                                key={number}
                                status={this.numberStatus(number)}
                                number={number}
                                onclick={this.onNumberClick}
                            />
                        )}
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        );
    }
}
