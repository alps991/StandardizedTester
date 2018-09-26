import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import answerKey from '../data/answerKey';
import { startTest, enterReviewMode } from '../actions/testing';
import ConfirmDeleteModal from './ConfirmDeleteModal';

class TestHistory extends React.Component {

    state = {
        deleting: false
    }

    reviewTest = (test) => {
        this.props.startTest({
            subject: test.subject,
            number: test.testNumber
        });
        this.props.enterReviewMode(test.chosenAnswers);
    }

    render() {
        return (
            <div className="test-history">
                <div className="test-history__header">
                    <h1>Test History</h1>
                    <Link to="/">
                        <button className="button">Dashboard</button>
                    </Link>
                </div>
                {this.props.pastTests.length == 0 ? (
                    <p>No past tests found, take some tests and you will be able to review them here.</p>
                ) : (
                        <div>
                            <div className="test-history__body">
                                {this.props.pastTests.map((test, i) => {
                                    return (
                                        <div className="test-summary" key={i}>
                                            <p>{answerKey[test.subject][test.testNumber].testName}</p>
                                            <p>Grade: {test.grade}%</p>
                                            <p>{test.timestamp}</p>
                                            <Link to={`/tests/${test.subject}-test-${test.testNumber + 1}/`}>
                                                <button
                                                    className="button"
                                                    onClick={() => this.reviewTest(test)}>
                                                    Review Test
                                            </button>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                            <button className="button button--delete" onClick={() => this.setState(() => ({ deleting: true }))}>
                                Clear All Data
                            </button>
                        </div>
                    )
                }
                <ConfirmDeleteModal
                    deleting={this.state.deleting}
                    handleClick={() => this.setState(() => ({ deleting: false }))}
                    ariaHideApp={false}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startTest: (test) => dispatch(startTest(test)),
    enterReviewMode: (chosenAnswers) => dispatch(enterReviewMode(chosenAnswers))
});

const mapStateToProps = (state) => ({
    pastTests: state.pastTests
});

export default connect(mapStateToProps, mapDispatchToProps)(TestHistory);