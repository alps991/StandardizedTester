import React from 'react';

const QuestionMap = (props) => {
    let checks = [];
    for (let i = 0; i < props.testLength; i++) {
        checks[i] = typeof props.chosenAnswers[i] === 'number' ? "/images/checked.png" : "/images/unchecked.png";
        if (i == props.questionNumber) {
            checks[i] = typeof props.chosenAnswers[i] === 'number' ? "/images/checked-highlighted.png" : "/images/unchecked-highlighted.png";
        }
    }
    return (
        <div>
            {checks.map((check, num) => (
                <img
                    className="questionShortcut"
                    src={window.location.origin + check}
                    onClick={() => props.handleJump(num)}
                    key={num}
                />
            ))}

        </div>
    );
}

export default QuestionMap;