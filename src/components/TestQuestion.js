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
        return (
            <div>
                <h3>Question {this.props.questionNumber + 1}</h3>
                <img src={this.props.currentQuestion.question} />
                {this.props.currentQuestion.choices.map((choice, i) => {
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