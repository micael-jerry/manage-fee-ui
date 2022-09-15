import React from "react";
import StudentModal from "./pageModal/StudentModal";
import Modal from "./Modal";
import FeeModal from "./pageModal/FeeModal";
import TransactionModal from "./pageModal/TransactionModal";
import GroupModal from "./pageModal/GroupModal";
import SchoolYearModal from "./pageModal/SchoolYearModal";
import {AxiosBasicCredentials} from "axios";

const ModalRender: React.FC<{
    modalState: any,
    toggleModal: (newState: any) => void,
    modalValue: any,
    request: string | null,
    credentials: AxiosBasicCredentials | null | undefined
}> = (props) => {
    const {modalState, toggleModal, modalValue, request, credentials} = props;

    return (
        <>
            {
                modalState.studentModal && (
                    <Modal toggleModal={toggleModal}>
                        <StudentModal modalValue={modalValue} request={request} credentials={credentials}/>
                    </Modal>
                )
            }
            {
                modalState.feeModal && (
                    <Modal toggleModal={toggleModal}>
                        <FeeModal modalValue={modalValue} request={request} credentials={credentials}/>
                    </Modal>
                )
            }
            {
                modalState.transactionModal && (
                    <Modal toggleModal={toggleModal}>
                        <TransactionModal modalValue={modalValue} request={request} credentials={credentials}/>
                    </Modal>
                )
            }
            {
                modalState.groupModal && (
                    <Modal toggleModal={toggleModal}>
                        <GroupModal modalValue={modalValue} request={request} credentials={credentials}/>
                    </Modal>
                )
            }
            {
                modalState.schoolYearModal && (
                    <Modal toggleModal={toggleModal}>
                        <SchoolYearModal modalValue={modalValue} request={request} credentials={credentials}/>
                    </Modal>
                )
            }
        </>
    )
}

export default ModalRender;
