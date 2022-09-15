import React, {useState} from "react";
import StudentModal from "./pageModal/StudentModal";
import Modal from "./Modal";
import FeeModal from "./pageModal/FeeModal";
import TransactionModal from "./pageModal/TransactionModal";
import GroupModal from "./pageModal/GroupModal";
import SchoolYearModal from "./pageModal/SchoolYearModal";

const ModalRender: React.FC<{
    modalState: any,
    toggleModal: (newState: any) => void,
    modalValue: any,
    request: string | null,
}> = (props) => {
    const {modalState, toggleModal, modalValue, request} = props;

    return (
        <>
            {
                modalState.studentModal && (
                    <Modal toggleModal={toggleModal}>
                        <StudentModal modalValue={modalValue} request={request}/>
                    </Modal>
                )
            }
            {
                modalState.feeModal && (
                    <Modal toggleModal={toggleModal}>
                        <FeeModal modalValue={modalValue} request={request}/>
                    </Modal>
                )
            }
            {
                modalState.transactionModal && (
                    <Modal toggleModal={toggleModal}>
                        <TransactionModal modalValue={modalValue} request={request}/>
                    </Modal>
                )
            }
            {
                modalState.groupModal && (
                    <Modal toggleModal={toggleModal}>
                        <GroupModal modalValue={modalValue} request={request}/>
                    </Modal>
                )
            }
            {
                modalState.schoolYearModal && (
                    <Modal toggleModal={toggleModal}>
                        <SchoolYearModal modalValue={modalValue} request={request}/>
                    </Modal>
                )
            }
        </>
    )
}

export default ModalRender;
