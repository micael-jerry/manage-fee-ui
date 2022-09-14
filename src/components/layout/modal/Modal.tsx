import React from "react";

const Modal: React.FC<any> = (props) => {
    const {toggleModal, children} = props;
    return (
        <>
            <div className={"position-fixed top-0 vw-100 vh-100"}>
                <div className={"w-100 h-100 bg-dark bg-opacity-75"} onClick={() => {
                    toggleModal("close");
                }}></div>
                <div className={"modal-component position-absolute top-50 start-50 translate-middle"}>
                    <div className={"modal-dialog "}>
                        <div className={"modal-content"}>
                            <div className={"modal-header"}>
                                <h5>Modal</h5>
                                <button className={"btn-close"} onClick={() => {
                                    toggleModal("close");
                                }}></button>
                            </div>
                            <div className={"modal-body"}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;
