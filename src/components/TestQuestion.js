import React from 'react';

class TestQuestion extends React.Component {

    handleSubmit = () => {
        this.props.handleNext(this.props.selected);
    }

    handleSelect = (e) => {
        const selected = Number(e.currentTarget.id);
        this.props.handleChoose(selected);
    }

    render() {
        let choiceList = [];
        const currentQuestion = this.props.questionNumber + 1;
        for (let i = 0; i < this.props.numberOfQuestions; i++) {
            choiceList.push(`/images/${this.props.test}/question-${currentQuestion}-choice-${i + 1}.png`);
        }
        return (
            <div>
                <h3>Question {this.props.questionNumber + 1}</h3>
                <img src={`/images/${this.props.test}/question-${currentQuestion}.png`} />
                {choiceList.map((choice, i) => {
                    const choiceClass = i == this.props.selected ? "selected" : "not-selected";
                    return (
                        <div onClick={this.handleSelect} id={i} key={i} className={choiceClass}>
                            {i + 1 + ": "}
                            <img src={choice} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TestQuestion;