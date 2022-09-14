import React from "react";
import './modal.css'

const StudentModal: React.FC<{}> = (props) => {
    return (
        <>
            <form className={"student-modal"}>
                <div className={"mb-3"}>
                    <label htmlFor={"student"}>Email</label>
                    <input type={"text"} name={"student"} id={"student"} required
                           className={"form-control"}/>
                    <p className={"text-danger mt-1"}>validation</p>
                </div>
                <button className={"btn btn-secondary"}>Submit</button>
            </form>
        </>
    )
}

export default StudentModal;
