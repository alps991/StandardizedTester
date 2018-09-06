import React from 'react';
import { connect } from 'react-redux';
import answerKey from '../data/answerKey';
import { startTest, enterReviewMode } from '../actions/testing';
import { Link } from 'react-router-dom';

class TestHistory extends React.Component {
    render() {
        return (
            <div className="test-history">
                <h2>Test History</h2>
                {this.props.pastTests.map((test, i) => {
                    return (
                        <div key={i}>
                            <p>{answerKey[test.subject][test.testNumber].testName}</p>
                            <p>Grade: {test.grade}%</p>
                            <Link to={`/tests/${test.subject}-test-${test.testNumber + 1}/`}>
                                <button
                                    className="button"
                                    onClick={() => {
                                        this.props.startTest({
                                            subject: test.subject,
                                            number: test.testNumber
                                        });
                                        this.props.enterReviewMode(test.chosenAnswers);
                                    }
                                    }>
                                    Review Test
                                </button>
                            </Link>
                        </div>
                    );
                })}
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