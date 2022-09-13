import React from "react";
import Navbar from "../layout/Navbar";

const Transaction: React.FC<{}> = (props) => {

    return (
        <>
            <Navbar/>
            <div className={"container"}>
                <h1>Transaction page</h1>
            </div>
        </>
    )
}

export default Transaction;
