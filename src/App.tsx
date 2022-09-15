import React, {useState} from 'react';
import Dashboard from "./components/dashboard/Dashboard";
import ModalRender from "./components/layout/modal/ModalRender";
import {FeeType, GroupType, StudentType, TransactionType} from "./types";

function App() {
    const [modalState, setModalState] = useState<any>({
        studentModal: false,
        feeModal: false,
        transactionModal: false,
        groupModal: false,
        schoolYearModal: false
    });

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
            <ModalRender modalState={modalState} toggleModal={toggleModal} modalValue={modalValue} request={request}/>
            <Dashboard toggleModal={toggleModal} setModalValue={setModalValue} setRequest={setRequest}/>
        </>
    );
}

export default App;
