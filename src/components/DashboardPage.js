import React from 'react';
import { Link } from 'react-router-dom';

class DashboardPage extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <h1>Welcome to the Standardized Tester!</h1>
                <h2>Choose your test:</h2>
                <Link className="header__title" to="/tests/algebra-1-test-1">
                    <button className="button">Algebra 1 Test 1</button>
                </Link>
                <Link className="header__title" to="/tests/geometry-test-1">
                    <button className="button">Geometry Test 1</button>
                </Link>
                <Link className="header__title" to="/tests/algebra-2-test-1">
                    <button className="button">Algebra 2 Test 1</button>
                </Link>
            </div>
        );
    }
}

export default DashboardPage;