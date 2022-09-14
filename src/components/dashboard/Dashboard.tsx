import React from "react";
import './dashboard.css'
import {Route, Routes} from "react-router-dom";
import Student from "../pages/Student";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SideBar from "../layout/SideBar";
import Fee from "../pages/Fee";
import Transaction from "../pages/Transaction";

const Dashboard: React.FC<{
    toggleModal: (modal: string) => void
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void
}> = (props) => {
    const {toggleModal, setModalValue, setRequest} = props;
    return (
        <div className="container-fluid">
            <div className="row">
                <SideBar/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Routes>
                        <Route path={"/"} element={<Home/>}></Route>
                        <Route path={"/fees"} element={<Fee toggleModal={toggleModal} setModalValue={setModalValue}
                                                            setRequest={setRequest}/>}></Route>
                        <Route path={"/students"}
                               element={<Student toggleModal={toggleModal} setModalValue={setModalValue}
                                                 setRequest={setRequest}/>}></Route>
                        <Route path={"/transaction"} element={<Transaction/>}></Route>
                        <Route path={"*"} element={<NotFound/>}></Route>
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;
