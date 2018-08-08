import React from 'react';
import { Link } from 'react-router-dom';
import TestQuestion from './TestQuestion';
import tests from '../data/tests';
import CompletionModal from './CompletionModal';
import ExitModal from './ExitModal';
import QuestionMap from './QuestionMap';

class Tester extends React.Component {

    state = {
        questionNumber: 0,
        chosenAnswers: [],
        complete: false,
        exitting: false,
        numCorrect: 0
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
            chosenAnswers[prevState.questionNumber] = chosen;
            return {
                chosenAnswers
            }
        });
    }

    handleGrade = () => {
        let numCorrect = 0;
        tests[0].questions.forEach((question, i) => {
            question.answer === this.state.chosenAnswers[i] && numCorrect++;
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
            numCorrect: 0
        }));
    }

    closeModal = () => {
        this.setState(() => ({ complete: false, exitting: false }));
    }

    render() {
        return (
            <div className="tester">
                <h2>Geometry Test 1</h2>
                <TestQuestion
                    questionNumber={this.state.questionNumber}
                    currentQuestion={tests[0].questions[this.state.questionNumber]}
                    handleNext={this.handleNext}
                    handleChoose={this.handleChoose}
                    selected={this.state.chosenAnswers[this.state.questionNumber]}
                />
                <button className="button" onClick={this.handleGrade}>Grade Test</button>
                {this.state.questionNumber > 0 && <button className="button" onClick={this.handleBack}>Back</button>}
                {this.state.questionNumber < tests[0].questions.length - 1 && <button className="button" onClick={this.handleNext}>Next</button>}
                <button className="button" onClick={() => this.setState(() => ({ exitting: true }))}>Quit Test</button>
                <QuestionMap
                    chosenAnswers={this.state.chosenAnswers}
                    testLength={tests[0].questions.length}
                    handleJump={this.handleJump}
                    questionNumber={this.state.questionNumber}
                />
                <CompletionModal
                    complete={this.state.complete}
                    correct={this.state.numCorrect}
                    total={tests[0].questions.length}
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