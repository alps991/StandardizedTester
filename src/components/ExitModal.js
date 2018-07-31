import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';

const ExitModal = (props) => (
    <Modal
        isOpen={!!props.exitting}
        onRequestClose={props.handleClick}
        contentLabel="Selected Option"
        closeTimeoutMS={500}
        className="modal"
    >
        <p>Are you sure you want to quit this test? All current progress will be lost.</p>
        <button className="button" onClick={props.handleClick}>Close</button>
        <button className="button" onClick={() => props.history.push('/')}>Exit Test</button>
    </Modal>
);

export default withRouter(ExitModal);