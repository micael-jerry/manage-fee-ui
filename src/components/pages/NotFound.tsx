import React from "react";
import Navbar from "../layout/Navbar";

const NotFound: React.FC<{}> = (props) => {
    return (
        <>
            <Navbar/>
            <div>
                <h1>Not Found</h1>
            </div>
        </>
    )
}

export default NotFound;
