import React, {useState} from 'react';
import Dashboard from "./components/dashboard/Dashboard";
import ModalRender from "./components/layout/modal/ModalRender";
import {FeeType, GroupType, StudentType} from "./types";

function App() {
    const [modalState, setModalState] = useState<any>({
        studentModal: false,
        feeModal: false
    });

    const [modalValue, setModalValue] = useState<null | StudentType | GroupType | FeeType>(null);
    const [request, setRequest] = useState<string | null>(null);

    const toggleModal = (modal: string) => {
        if (modal == "studentModal") {
            setModalState({
                studentModal: true,
                feeModal: false
            })
        }
        if (modal == "feeModal") {
            setModalState({
                studentModal: false,
                feeModal: true
            })
        }
        if (modal == "close") {
            setModalState({
                studentModal: false,
                feeModal: false
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
