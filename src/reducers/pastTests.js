export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TEST':
            return [
                ...state,
                action.testData
            ];
        case 'SET_TESTS':
            return action.pastTests;
        case 'CLEAR_TESTS':
            return [];
        default:
            return state;
    }
}