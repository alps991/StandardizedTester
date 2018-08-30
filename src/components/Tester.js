import React from 'react';
import TestQuestion from './TestQuestion';
import CompletionModal from './CompletionModal';
import ExitModal from './ExitModal';
import QuestionMap from './QuestionMap';
import Timer from './Timer';
import answerKey from '../data/answerKey';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class Tester extends React.Component {

    constructor(props) {
        super(props);
        let test = this.props.match.params.id;
        if (Object.keys(answerKey).includes(test)) {
            this.answers = answerKey[test].answers;
        } else {
            this.answers = null;
        }
    }

    state = {
        questionNumber: 0,
        chosenAnswers: [],
        complete: false,
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
        this.answers.forEach((answer, i) => {
            answer === this.state.chosenAnswers[i] && numCorrect++;
        });
        this.setState(() => ({
            complete: true,
            numCorrect
        }));
    }

    handleRestart = () => {
        this.setState(() => ({
            questionNumber: 0,
            chosenAnswers: [],
            complete: false,
            numCorrect: 0,
            startTime: moment()
        }));
    }

    closeModal = () => {
        this.setState(() => ({ complete: false, exitting: false }));
    }

    render() {
        if (this.answers == null) {
            return <Redirect to="/404" />;
        }

        return (
            <div className="tester">
                <div className="tester__header">
                    <h2 className="tester__title">{answerKey[this.props.match.params.id].testName}</h2>
                    <Timer startTime={this.state.startTime} />
                </div>
                <TestQuestion
                    questionNumber={this.state.questionNumber}
                    numberOfQuestions={answerKey[this.props.match.params.id].numberOfQuestions[this.state.questionNumber]}
                    test={this.props.match.params.id}
                    handleNext={this.handleNext}
                    handleChoose={this.handleChoose}
                    selected={this.state.chosenAnswers[this.state.questionNumber]}
                />
                <button className="button" onClick={this.handleBack} disabled={this.state.questionNumber <= 0}>Back</button>
                <button className="button next-button" onClick={this.handleNext} disabled={this.state.questionNumber >= this.answers.length - 1}>Next</button>
                <QuestionMap
                    chosenAnswers={this.state.chosenAnswers}
                    testLength={this.answers.length}
                    handleJump={this.handleJump}
                    questionNumber={this.state.questionNumber}
                />
                <button className="button" onClick={this.handleGrade}>Grade Test</button>
                <button className="button" onClick={() => this.setState(() => ({ exitting: true }))}>Quit Test</button>
                <CompletionModal
                    complete={this.state.complete}
                    correct={this.state.numCorrect}
                    total={this.answers.length}
                    handleClick={this.closeModal}
                    handleRestart={this.handleRestart}
                />
                <ExitModal
                    exitting={this.state.exitting}
                    handleClick={this.closeModal}
                />
            </div>
        );
    }
}

export default Tester;