import React, {useState} from 'react';
import Dashboard from "./components/dashboard/Dashboard";
import ModalRender from "./components/layout/modal/ModalRender";

function App() {
    const [modalState, setModalState] = useState<any>({
        studentModal: true,
        feeModal: false
    })

    const toggleModal = (modal:string) => {
        if(modal == "studentModal") {
            setModalState({
                studentModal: true,
                feeModal: false
            })
        }
        if(modal == "feeModal") {
            setModalState({
                studentModal: false,
                feeModal: false
            })
        }
        if(modal == "close") {
            setModalState({
                studentModal: false,
                signInModal: false
            })
        }
    }

    return (
        <>
            <ModalRender modalState={modalState} toggleModal={toggleModal}/>
            <Dashboard/>
        </>
    );
}

export default App;
