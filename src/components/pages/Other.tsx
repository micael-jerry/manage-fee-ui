import React from "react";
import Navbar from "../layout/Navbar";
import Group from "./Group";
import SchoolYear from "./SchoolYear";
import {AxiosBasicCredentials} from "axios";

const Other: React.FC<{
    toggleModal: (modal: string) => void
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {toggleModal, setModalValue, setRequest, credentials} = props;
    return (
        <>
            <Navbar/>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {
                            setRequest("add");
                            toggleModal("schoolYearModal");
                        }}>ADD NEW SCHOOL YEAR
                        </button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {
                        setRequest("add");
                        toggleModal("groupModal");
                    }}>ADD NEW GROUP
                    </button>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-6"}>
                    <Group toggleModal={toggleModal} setModalValue={setModalValue} setRequest={setRequest}
                           credentials={credentials}/>
                </div>
                <div className={"col-1"}></div>
                <div className={"col"}>
                    <SchoolYear toggleModal={toggleModal} setModalValue={setModalValue} setRequest={setRequest}
                                credentials={credentials}/>
                </div>
            </div>
        </>
    )
}

export default Other;
