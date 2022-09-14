import React, {useState} from "react";
import StudentModal from "./studentModal/StudentModal";
import Modal from "./Modal";

const ModalRender: React.FC<{
    modalState: any,
    toggleModal: (newState: any) => void
}> = (props) => {
    const {modalState,toggleModal} = props;

    return (
        <>
            {
                modalState.studentModal && (
                    <Modal toggleModal={toggleModal}>
                        <StudentModal/>
                    </Modal>
                )
            }
        </>
    )
}

export default ModalRender;
