import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { startClearTestData } from '../actions/pastTests';

const ConfirmDeleteModal = (props) => (
    <Modal
        isOpen={!!props.deleting}
        onRequestClose={props.handleClick}
        contentLabel="Selected Option"
        closeTimeoutMS={500}
        className="modal"
        ariaHideApp={false}
    >
        <p>Are you sure you want to delete all previous test data?</p>
        <button className="button" onClick={props.handleClick}>Close</button>
        <button
            className="button"
            onClick={() => {
                props.startClearTestData();
                props.handleClick();
            }}>
            Clear Data
        </button>
    </Modal>
);

const mapDispatchtoProps = (dispatch) => ({
    startClearTestData: () => dispatch(startClearTestData())
});

export default withRouter(connect(undefined, mapDispatchtoProps)(ConfirmDeleteModal));