import React from "react";
import Navbar from "../layout/Navbar";

const Home: React.FC<{}> = (props) => {

    return (
        <>
            <Navbar/>
            <div className={"container"}>
                <h1>Home page</h1>
            </div>
        </>
    )
}

export default Home;
