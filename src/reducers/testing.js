export default (state = {}, action) => {
    switch (action.type) {
        case 'START_TEST':
            return {
                ...state,
                isTesting: true
            }
        case 'END_TEST':
            return {
                ...state,
                isTesting: false
            }
        default:
            return state;
    }
}