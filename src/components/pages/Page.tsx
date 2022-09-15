import React from "react";
import Dashboard from "../dashboard/Dashboard";
import {BasicAuthType} from "../../types";
import Login from "./login/Login";
import {AxiosBasicCredentials} from "axios";

const Page: React.FC<{
    toggleModal: (modal: string) => void
    setModalValue: (value: any) => void,
    setRequest: (value: string | null) => void,
    credentials: AxiosBasicCredentials | undefined | null,
    setCredentials: (val: any) => void,
    logout: () => void
}> = (props) => {
    const {toggleModal, setModalValue, setRequest, credentials, setCredentials, logout} = props;
    return (
        <>
            {
                credentials == undefined ? (<Login setCredentials={setCredentials}/>) :
                    (credentials == null) ? (<Login setCredentials={setCredentials}/>) :
                        <Dashboard toggleModal={toggleModal} setModalValue={setModalValue} setRequest={setRequest}
                                   credentials={credentials} logout={logout}/>
            }
        </>
    )
}

export default Page;
