import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';

const CompletionModal = (props) => (
    <Modal
        isOpen={!!props.isOpen}
        contentLabel="Selected Option"
        closeTimeoutMS={500}
        className="modal"
    >
        <p>You answered {props.correct} out of {props.total} questions correctly.</p>
        <button className="button" onClick={() => {
            props.handleExit();
            props.history.push("/");
        }}>Return to Dashboard</button>
        <button className="button" onClick={props.handleRestart}>Restart Test</button>
        <button className="button" onClick={props.handleReview}>Review Test</button>
    </Modal>
);

export default withRouter(CompletionModal);