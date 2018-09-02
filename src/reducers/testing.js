export default (state = {}, action) => {
    switch (action.type) {
        case 'START_TEST':
            return {
                isTesting: true,
                subject: action.subject,
                number: action.number
            }
        case 'FINISH_TEST':
            return {
                isTesting: false
            }
        default:
            return state;
    }
}