import React from 'react';
import moment from 'moment';
import durationFormat from 'moment-duration-format';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: moment.duration(90, 'minutes')
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState((prevState) => ({
                timeLeft: moment.duration(prevState.timeLeft.subtract(1, 'second'))
            }));
        }, 1000)
    }

    render() {
        return (
            <div>
                {this.state.timeLeft.format()}
            </div>
        );
    }
}

export default Timer;