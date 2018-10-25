import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';

class CompletionModal extends React.Component {

    state = {
        readyToGrade: false
    }

    render() {
        return (
            !this.state.allAnswered ? (
                <Modal
                    isOpen={!!this.props.isOpen}
                    onRequestClose={this.props.handleExit}
                    contentLabel="Selected Option"
                    closeTimeoutMS={500}
                    className="modal"
                    ariaHideApp={false}
                >
                    <p>Are you sure you want to be graded?</p>
                    <button className="button" onClick={this.props.handleExit}>Cancel</button>
                    <button
                        className="button"
                        onClick={() => {
                            this.setState(() => ({ allAnswered: true }));
                            this.props.handleGrade();
                        }}>Grade</button>
                </Modal>
            ) : (
                    <Modal
                        isOpen={!!this.props.isOpen}
                        contentLabel="Selected Option"
                        closeTimeoutMS={500}
                        className="modal"
                        ariaHideApp={false}
                    >
                        <p>You answered {this.props.correct} out of {this.props.total} questions correctly ({Math.floor(this.props.correct * 100 / this.props.total)}%)</p>
                        <button className="button" onClick={() => {
                            this.props.handleExit();
                            this.props.history.push("/");
                        }}>Return to Dashboard</button>
                        <button className="button" onClick={this.props.handleRestart}>Restart Test</button>
                        <button className="button" onClick={this.props.handleReview}>Review Test</button>
                    </Modal>
                )
        );
    }
}


export default withRouter(CompletionModal);