import React from 'react';
import moment from 'moment';
import durationFormat from 'moment-duration-format';
import { connect } from 'react-redux';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: moment.duration(5, 'seconds')
        }
    }

    componentDidMount() {
        if (!this.props.reviewMode) {
            this.interval = setInterval(() => {
                (!this.props.reviewMode && moment.duration(this.state.timeLeft).asSeconds() > 0) && this.setState((prevState) => ({
                    timeLeft: moment.duration(prevState.timeLeft.subtract(1, 'second'))
                }));
            }, 1000)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.startTime.format() != nextProps.startTime.format()) {
            this.setState(() => ({
                timeLeft: moment.duration(90, 'minutes')
            }));
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className={moment.duration(this.state.timeLeft).asSeconds() == 0 ? "timer__timeout" : undefined}>
                {this.state.timeLeft.format()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    reviewMode: state.testing.reviewMode
});

export default connect(mapStateToProps)(Timer);