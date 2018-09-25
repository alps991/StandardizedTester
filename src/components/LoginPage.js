import React from 'react';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { startLoginGoogle, startLoginAnonymous } from '../actions/auth';

export const LoginPage = ({ startLoginGoogle, startLoginAnonymous }) => (
    <div className="box-layout">
        <div className="box-layout__box login-box">
            <h1 className="box-layout__title">Standardized Tester</h1>
            <p>Login to start practicing</p>
            <GoogleButton onClick={startLoginGoogle}>Login with Google</GoogleButton>
            <button className="button guest-login" onClick={startLoginAnonymous}>Guest Login</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLoginGoogle: () => dispatch(startLoginGoogle()),
    startLoginAnonymous: () => dispatch(startLoginAnonymous())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
