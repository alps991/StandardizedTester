import React from 'react';
import Modal from 'react-modal';

const CompletionModal = (props) => (
    <Modal
        isOpen={!!props.complete}
        onRequestClose={props.handleClick}
        contentLabel="Selected Option"
        closeTimeoutMS={500}
        className="modal"
    >
        <p>You answered {props.correct} out of {props.total} questions correctly.</p>
        <button className="button" onClick={props.handleClick}>Close</button>
        <button className="button" onClick={props.handleRestart}>Restart Test</button>
    </Modal>
);

export default CompletionModal;