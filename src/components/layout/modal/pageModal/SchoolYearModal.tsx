import React, {useEffect, useState} from "react";
import './modal.css'
import {SchoolYearType} from "../../../../types";
import axios from "axios";
import {BASE_URL} from "../../../../properties";

const SchoolYearModal: React.FC<{
    modalValue: any,
    request: string | null
}> = (props) => {
    const {modalValue, request} = props;
    const [value, setValue] = useState<SchoolYearType>();

    useEffect(() => {
        if (modalValue != null) {
            setValue(modalValue);
        } else {
            setValue({id: null, startYear: "", endYear: ""})
        }
    }, [modalValue]);

    const onSubmit = async () => {
        let data = [];
        data.push(value)
        if (request == "add") {
            await axios.post(
                BASE_URL + "/school-year", data
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        } else if (request == "update") {
            await axios.put(
                BASE_URL + "/school-year/" + value!.id,
                value
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const inputChangeValue = async (event: any) => {
        let key = event.target.id;
        let value = event.target.value;
        if (key === "startYear") {
            setValue((state: any) => {
                return {...state, "startYear": value}
            });
        } else if (key === "endYear") {
            setValue((state: any) => {
                return {...state, "endYear": value}
            });
        }
    }

    return (
        <>
            <form className={"student-modal"}>
                <div className={"mb-3"}>
                    <label htmlFor={"type"}>Start year</label>
                    <input type={"text"} name={"startYear"} id={"startYear"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.startYear) : ""}/>
                    <label htmlFor={"type"}>End Year</label>
                    <input type={"text"} name={"endYear"} id={"endYear"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.endYear == null ? "" : value.endYear) : ""}/>
                </div>
            </form>
            <button className={"btn btn-secondary"} onClick={onSubmit}>Submit</button>
        </>
    )
}
export default SchoolYearModal;
