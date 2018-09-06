import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = (props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                {props.isTesting && !props.reviewMode ? (
                    <div className="header__title">
                        <h1>Standardized Tester</h1>
                    </div>
                ) : (
                        <Link className="header__title" to="/dashboard">
                            <h1>Standardized Tester</h1>
                        </Link>
                    )
                }
                <button className="button button--link" onClick={props.startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapStateToProps = (state) => ({
    isTesting: state.testing.isTesting,
    reviewMode: state.testing.reviewMode
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
