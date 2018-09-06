import React from 'react';
import answerKey from '../data/answerKey';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startTest } from '../actions/testing';

class DashboardPage extends React.Component {

    state = {
        selectedSubject: "",
        selectedTestNumber: -1
    }

    selectSubject = (subject) => {
        if (this.state.selectedSubject == subject) {
            this.setState(() => ({
                selectedSubject: "",
                selectedTestNumber: -1
            }));
        } else {
            this.setState(() => ({
                selectedSubject: subject,
                selectedTestNumber: -1
            }));
        }
    }

    selectTestNumber = (num) => {
        if (this.state.selectedTestNumber == num) {
            this.setState(() => ({
                selectedTestNumber: -1
            }));
        } else {
            this.setState(() => ({
                selectedTestNumber: num
            }));
        }
    }

    render() {

        let pastTestData = this.props.pastTests.filter((test) => {
            return test.subject == this.state.selectedSubject && test.testNumber == this.state.selectedTestNumber;
        });

        if (pastTestData) {
            var best = 0;
            pastTestData.forEach((test) => {
                best = Math.max(best, test.grade);
            });
        }

        return (
            <div className="dashboard">
                <div className="dashboard__header">
                    <h1>Welcome to the Standardized Tester!</h1>
                    <Link to="/history">
                        <button className="button">Test History</button>
                    </Link>
                </div>
                <h2>Choose your subject:</h2>
                <div className="subjects">
                    <button
                        className={this.state.selectedSubject == "algebra-1" ? "button selected" : "button"}
                        onClick={() => this.selectSubject("algebra-1")}
                    >
                        Algebra 1
                    </button>
                    <button
                        className={this.state.selectedSubject == "geometry" ? "button selected" : "button"}
                        onClick={() => this.selectSubject("geometry")}
                    >
                        Geometry
                    </button>
                    <button
                        className={this.state.selectedSubject == "algebra-2" ? "button selected" : "button"}
                        onClick={() => this.selectSubject("algebra-2")}
                    >
                        Algebra 2
                        </button>
                </div>
                {this.state.selectedSubject && (
                    <div>
                        <h2>Choose your test:</h2>
                        {answerKey[this.state.selectedSubject].map((test, i) => {
                            return (
                                <button
                                    className={this.state.selectedTestNumber == i ? "button selected" : "button"}
                                    key={i}
                                    onClick={() => this.selectTestNumber(i)}
                                >
                                    {test.testName}
                                </button>
                            );
                        })}
                    </div>
                )}
                {this.state.selectedTestNumber >= 0 && (
                    <div>
                        {pastTestData && <h3>Your previous best: {best}%</h3>}
                        <Link to={`/tests/${this.state.selectedSubject}-test-${this.state.selectedTestNumber + 1}/`}>
                            <button
                                className="button"
                                onClick={() => this.props.startTest({
                                    subject: this.state.selectedSubject,
                                    number: this.state.selectedTestNumber
                                })}
                            >
                                Start
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startTest: (test) => dispatch(startTest(test))
});

const mapStateToProps = (state) => ({
    pastTests: state.pastTests
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);