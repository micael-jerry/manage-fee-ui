import React from "react";
import './dashboard.css'
import {Route, Routes} from "react-router-dom";
import Student from "../pages/Student";
import NotFound from "../pages/NotFound";
import SideBar from "../layout/SideBar";
import Fee from "../pages/Fee";
import Transaction from "../pages/Transaction";
import Other from "../pages/Other";
import {AxiosBasicCredentials} from "axios";

const Dashboard: React.FC<{
    toggleModal: (modal: string) => void
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void,
    credentials: AxiosBasicCredentials | null | undefined,
    logout: () => void
}> = (props) => {
    const {toggleModal, setModalValue, setRequest, credentials, logout} = props;
    return (
        <div className="container-fluid">
            <div className="row">
                <SideBar logout={logout}/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Routes>
                        <Route path={"/"} element={<Fee toggleModal={toggleModal} setModalValue={setModalValue}
                                                            setRequest={setRequest}
                                                            credentials={credentials}/>}></Route>
                        <Route path={"/students"}
                               element={<Student toggleModal={toggleModal} setModalValue={setModalValue}
                                                 setRequest={setRequest} credentials={credentials}/>}></Route>
                        <Route path={"/transaction"}
                               element={<Transaction toggleModal={toggleModal} setModalValue={setModalValue}
                                                     setRequest={setRequest} credentials={credentials}/>}></Route>
                        <Route path={"/other"} element={<Other toggleModal={toggleModal} setModalValue={setModalValue}
                                                               setRequest={setRequest}
                                                               credentials={credentials}/>}></Route>
                        <Route path={"*"} element={<NotFound/>}></Route>
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;
