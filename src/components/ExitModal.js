import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { finishTest } from '../actions/testing';

const ExitModal = (props) => (
    <Modal
        isOpen={!!props.exitting}
        onRequestClose={props.handleClick}
        contentLabel="Selected Option"
        closeTimeoutMS={500}
        className="modal"
        ariaHideApp={false}
    >
        <p>Are you sure you want to quit this test? All current progress will be lost.</p>
        <button className="button" onClick={props.handleClick}>Close</button>
        <button
            className="button"
            onClick={() => {
                props.finishTest();
                props.history.push('/');
            }}>
            Exit Test
        </button>
    </Modal>
);

const mapDispatchtoProps = (dispatch) => ({
    finishTest: () => dispatch(finishTest())
});

export default withRouter(connect(undefined, mapDispatchtoProps)(ExitModal));