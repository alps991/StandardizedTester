import database from '../firebase/firebase';

export const startSaveTest = (testData) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/pastTests`).push(testData).then((ref) => {
            dispatch(addTestData({
                id: ref.key,
                ...testData
            }));
        })
    }
}

export const addTestData = (testData) => ({
    type: 'ADD_TEST',
    testData
});

export const clearTestData = () => ({
    type: 'CLEAR_TESTS'
});

export const startClearTestData = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/pastTests`).remove().then(() => {
            dispatch(clearTestData());
        });
    }
}

export const startSetPastTests = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/pastTests`).once('value').then((snapshot) => {
            const pastTests = [];

            snapshot.forEach((childSnapshot) => {
                pastTests.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setPastTests(pastTests));
        });
    }
}

export const setPastTests = (pastTests) => ({
    type: 'SET_TESTS',
    pastTests
});