import React from "react";
import {Link} from "react-router-dom";

const SideBar: React.FC<{
    logout: () => void
}> = (props) => {
    const {logout} = props;
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/"}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/fees"}>
                            Fee
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/transaction"}>
                            Transaction
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/students"}>
                            Students
                        </Link>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Others</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <Link className="nav-link" to={"other"}>
                            <span data-feather="file-text"></span>
                            Groups and School Year
                        </Link>
                    </li>
                </ul>
                <button onClick={logout} >LOGOUT</button>
            </div>
        </nav>
    )
}

export default SideBar;
