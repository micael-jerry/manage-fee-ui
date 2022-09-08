import React from "react";
import {Link} from "react-router-dom";

const Navbar: React.FC<{}> = (props) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <Link to={"/"} className={"navbar-brand"}>Manage Fee</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/fee"} className="nav-link">Fee</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/transaction"} className="nav-link">Transaction</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/student"} className="nav-link">Student</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
