export default (state = {}, action) => {
    switch (action.type) {
        case 'START_TEST':
            return {
                isTesting: true,
                subject: action.subject,
                number: action.number,
                reviewMode: false
            }
        case 'FINISH_TEST':
            return {
                isTesting: false
            }
        case 'ENTER_REVIEW_MODE':
            return {
                ...state,
                reviewMode: true
            }
        default:
            return state;
    }
}