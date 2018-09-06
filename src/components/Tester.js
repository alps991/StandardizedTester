import React from 'react';
import TestQuestion from './TestQuestion';
import CompletionModal from './CompletionModal';
import ExitModal from './ExitModal';
import QuestionMap from './QuestionMap';
import Timer from './Timer';
import answerKey from '../data/answerKey';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startSaveTest } from '../actions/pastTests';
import { enterReviewMode } from '../actions/testing';

class Tester extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.subject) {
            this.test = answerKey[this.props.subject][this.props.testNumber];
        }
    }

    state = {
        questionNumber: 0,
        chosenAnswers: this.props.chosenAnswers || [],
        grading: false,
        exitting: false,
        numCorrect: 0,
        startTime: moment()
    }

    handleNext = () => {
        this.setState((prevState) => ({
            questionNumber: prevState.questionNumber + 1
        }));
    }

    handleBack = () => {
        this.setState((prevState) => ({
            questionNumber: prevState.questionNumber - 1
        }));
    }

    handleJump = (num) => {
        this.setState(() => ({
            questionNumber: num
        }));
    }

    handleChoose = (chosen) => {
        this.setState((prevState) => {
            let chosenAnswers = prevState.chosenAnswers;
            if (chosenAnswers[prevState.questionNumber] == chosen) {
                chosenAnswers[prevState.questionNumber] = null;
            } else {
                chosenAnswers[prevState.questionNumber] = chosen;
            }
            return {
                chosenAnswers
            }
        });
    }

    handleGrade = () => {
        let numCorrect = 0;
        this.test.answers.forEach((answer, i) => {
            answer === this.state.chosenAnswers[i] && numCorrect++;
        });
        this.props.startSaveTest({
            subject: this.props.subject,
            testNumber: this.props.testNumber,
            chosenAnswers: this.state.chosenAnswers,
            grade: Math.floor((numCorrect * 100) / this.test.answers.length)
        })
        this.setState(() => ({
            grading: true,
            numCorrect
        }));
    }

    handleRestart = () => {
        this.setState(() => ({
            questionNumber: 0,
            chosenAnswers: [],
            grading: false,
            numCorrect: 0,
            startTime: moment()
        }));
    }

    handleReview = () => {
        this.props.enterReviewMode();
        this.setState(() => ({
            grading: false
        }));
    }

    closeModal = () => {
        this.setState(() => ({ grading: false, exitting: false }));
    }

    render() {
        if (!this.props.subject) {
            return <Redirect to="/" />;
        }
        return (
            <div className="tester">
                <div className="tester__header">
                    <h2 className="tester__title">{this.test.testName}{this.props.reviewMode && " - Review"}</h2>
                    <Timer startTime={this.state.startTime} />
                </div>
                <TestQuestion
                    questionNumber={this.state.questionNumber}
                    numberOfQuestions={this.test.numberOfChoices[this.state.questionNumber]}
                    test={this.props.match.params.id}
                    handleNext={this.handleNext}
                    handleChoose={this.handleChoose}
                    selected={this.state.chosenAnswers[this.state.questionNumber]}
                    reviewMode={this.props.reviewMode}
                />
                <button className="button" onClick={this.handleBack} disabled={this.state.questionNumber <= 0}>Back</button>
                <button
                    className="button next-button"
                    onClick={this.handleNext}
                    disabled={this.state.questionNumber >= this.test.answers.length - 1}
                >
                    Next
                </button>
                <QuestionMap
                    chosenAnswers={this.state.chosenAnswers}
                    testLength={this.test.answers.length}
                    handleJump={this.handleJump}
                    questionNumber={this.state.questionNumber}
                />
                <button className="button" onClick={this.handleGrade} disabled={this.props.reviewMode}>Grade Test</button>
                <button className="button" onClick={() => this.setState(() => ({ exitting: true }))}>Quit Test</button>
                <CompletionModal
                    isOpen={this.state.grading}
                    correct={this.state.numCorrect}
                    total={this.test.answers.length}
                    handleExit={this.closeModal}
                    handleRestart={this.handleRestart}
                    handleReview={this.handleReview}
                />
                <ExitModal
                    exitting={this.state.exitting}
                    handleClick={this.closeModal}
                />
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => ({
    startSaveTest: (testData) => dispatch(startSaveTest(testData)),
    enterReviewMode: () => dispatch(enterReviewMode())
});

const mapStatetoProps = (state) => ({
    subject: state.testing.subject,
    testNumber: state.testing.number,
    reviewMode: state.testing.reviewMode,
    chosenAnswers: state.testing.chosenAnswers
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Tester);