import React from 'react';
import answerKey from '../data/answerKey';
import { connect } from 'react-redux';

class TestQuestion extends React.Component {

    handleSelect = (e) => {
        if (!this.props.reviewMode) {
            const selected = Number(e.currentTarget.id);
            this.props.handleChoose(selected);
        }
    }

    render() {
        let choiceList = [];
        const currentQuestion = this.props.questionNumber + 1;
        for (let i = 0; i < this.props.numberOfQuestions; i++) {
            choiceList.push(`/images/${this.props.test}/question-${currentQuestion}-choice-${i + 1}.png`);
        }
        const answers = answerKey[this.props.subject][this.props.testNumber].answers;

        return (
            <div className="test-question">
                <h3 className="test-question__title" >Question {this.props.questionNumber + 1}</h3>
                <img src={`/images/${this.props.test}/question-${currentQuestion}.png`} className="question" />
                {choiceList.map((choice, i) => {
                    let choiceClass = i == this.props.selected ? "choice choice__selected" : "choice";
                    if (this.props.reviewMode) {
                        if (answers[currentQuestion - 1] == i) { choiceClass += " choice__correct"; }
                        if (this.props.selected == i && answers[currentQuestion - 1] != i) { choiceClass += " choice__incorrect"; }
                    }
                    const j = i + 1;
                    return (
                        <div onClick={this.handleSelect} id={i} key={i} className={choiceClass}>
                            {`(${j})`}
                            <img src={choice} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    subject: state.testing.subject,
    testNumber: state.testing.number,
    reviewMode: state.testing.reviewMode
});

export default connect(mapStateToProps)(TestQuestion);