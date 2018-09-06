export const startTest = ({ subject, number }) => ({
    type: 'START_TEST',
    subject,
    number
});

export const finishTest = () => ({
    type: 'FINISH_TEST'
});

export const enterReviewMode = (chosenAnswers = []) => ({
    type: 'ENTER_REVIEW_MODE',
    chosenAnswers
});