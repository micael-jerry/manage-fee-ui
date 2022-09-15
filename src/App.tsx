import React, {useEffect, useState} from 'react';

import ModalRender from "./components/layout/modal/ModalRender";
import {FeeType, GroupType, StudentType, TransactionType} from "./types";
import Page from "./components/pages/Page";
import {AxiosBasicCredentials} from "axios";

function App() {
    const [modalState, setModalState] = useState<any>({
        studentModal: false,
        feeModal: false,
        transactionModal: false,
        groupModal: false,
        schoolYearModal: false
    });

    const [credentials, setCredentials] = useState<AxiosBasicCredentials | null | undefined>(null);

    useEffect(() => {
        let localUsername = localStorage.getItem("username");
        let localPassword = localStorage.getItem("password")
        if (localPassword != null && localUsername != null) {
            setCredentials({
                username: localUsername,
                password: localPassword
            });
        }
    }, [])

    useEffect(() => {
        if (credentials) {
            if (credentials.username != null && credentials.password != null) {
                localStorage.setItem("username", credentials.username);
                localStorage.setItem("password", credentials.password);
            }
        }
    }, [credentials]);

    const logout = (): void => {
        setCredentials(null);
        localStorage.clear();
    }

    const [modalValue, setModalValue] = useState<null | StudentType | GroupType | FeeType | TransactionType>(null);
    const [request, setRequest] = useState<string | null>(null);

    const toggleModal = (modal: string) => {
        if (modal == "studentModal") {
            setModalState({
                studentModal: true,
                feeModal: false,
                transactionModal: false,
                groupModal: false,
                schoolYearModal: false
            })
        } else if (modal == "feeModal") {
            setModalState({
                studentModal: false,
                feeModal: true,
                transactionModal: false,
                groupModal: false,
                schoolYearModal: false
            })
        } else if (modal == "transactionModal") {
            setModalState({
                studentModal: false,
                feeModal: false,
                transactionModal: true,
                groupModal: false,
                schoolYearModal: false
            })
        } else if (modal == "groupModal") {
            setModalState({
                studentModal: false,
                feeModal: false,
                transactionModal: false,
                groupModal: true,
                schoolYearModal: false
            })
        } else if (modal == "schoolYearModal") {
            setModalState({
                studentModal: false,
                feeModal: false,
                transactionModal: false,
                groupModal: false,
                schoolYearModal: true
            })
        } else if (modal == "close") {
            setModalState({
                studentModal: false,
                feeModal: false,
                transactionModal: false,
                groupModal: false,
                schoolYearModal: false
            })
            setRequest(null);
            setModalValue(null);
        }
    }

    return (
        <>
            <ModalRender modalState={modalState} toggleModal={toggleModal} modalValue={modalValue} request={request}
                         credentials={credentials}/>
            <Page toggleModal={toggleModal} setModalValue={setModalValue} setRequest={setRequest}
                  credentials={credentials} setCredentials={setCredentials} logout={logout}/>
        </>
    );
}

export default App;
