export const startTest = (test) => ({
    type: 'START_TEST',
    test
});

export const finishTest = () => ({
    type: 'FINISH_TEST'
});