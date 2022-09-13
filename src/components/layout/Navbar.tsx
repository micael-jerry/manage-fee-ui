import React, {useState} from "react";
import {Link} from "react-router-dom";

type navProps = {
    search?: (regex: string) => any,
    labelSearch?: string,
    searchBar?: boolean
}

const Navbar: React.FC<navProps> = (props) => {
    const {search, labelSearch, searchBar} = props;
    const [val, setVal] = useState<string>("");

    const valHandleChange = (event: any) => {
        setVal(event.target.value);
    }

    const navSearch = () => {
        if (search) {
            search(val);
        }
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <Link to={"/"} className={"navbar-brand"}>Manage Fee</Link>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {
                        searchBar ? (
                            <>
                                <div className={"navbar-nav me-auto mb-2 mb-md-0"}></div>
                                <div className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder={labelSearch}
                                           aria-label="Search" onChange={valHandleChange}/>
                                    <button className="btn btn-outline-success" onClick={navSearch}>Search</button>
                                </div>
                            </>
                        ) : (<></>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
