import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Navbar:React.FC<{}> = (props) => {
    const navigate = useNavigate();
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
                            <a className="nav-link active" onClick={() => {
                                navigate("/")
                            }}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => {
                                navigate("/fee")
                            }}>Fee</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => {
                                navigate("/transaction")
                            }}>Transaction</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={() => {
                                navigate("/student")
                            }}>Student</a>
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
