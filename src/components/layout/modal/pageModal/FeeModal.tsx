import React, {useEffect, useState} from "react";
import './modal.css'
import {FeeType, SchoolYearType, StudentType} from "../../../../types";
import axios from "axios";
import {BASE_URL} from "../../../../properties";

const FeeModal: React.FC<{
    modalValue: any,
    request: string | null
}> = (props) => {
    const {modalValue, request} = props;
    const [value, setValue] = useState<FeeType>();
    const [studentsList, setStudentList] = useState<StudentType[]>();
    const [selectSchoolYear, setSelectSchoolYear] = useState<SchoolYearType[]>();

    useEffect(() => {
        getAllStudent();
        getAllSchoolYear();
        if (modalValue != null) {
            setValue(modalValue);
        } else {
            setValue(
                {
                    description: null, id: null,
                    remainingAmount: 0, schoolYear: null,
                    student: null, totalAmount: 0, type: ""
                }
            )
        }
    }, [modalValue]);

    const onSubmit = async () => {
        if (request == "add") {
            let data = [];
            data.push(value);
            await axios.post(
                BASE_URL + "/fees", data
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        } else if (request == "update") {
            await axios.put(
                BASE_URL + "/fees/" + value!.id,
                value
            ).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const getAllStudent = async () => {
        await axios.get(BASE_URL + "/users/role/student").then((res) => {
            setStudentList(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }

    const getAllSchoolYear = async () => {
        await axios.get(BASE_URL + "/school-year").then((res) => {
            setSelectSchoolYear(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const inputChangeValue = async (event: any) => {
        let key = event.target.id;
        let value = event.target.value;
        if (key === "type") {
            setValue((state: any) => {
                return {...state, "type": value}
            });
        } else if (key === "totalAmount") {
            setValue((state: any) => {
                return {...state, "totalAmount": value}
            });
        } else if (key === "description") {
            setValue((state: any) => {
                return {...state, "description": value}
            });
        } else if (key === "student") {
            setValue((state: any) => {
                return {
                    ...state, "student": {
                        "id": value
                    }
                }
            })
        } else if (key === "schoolYear") {
            setValue((state: any) => {
                return {
                    ...state, "schoolYear": {
                        "id": value
                    }
                }
            })
        }
    }

    return (
        <>
            <form className={"student-modal"}>
                <div className={"mb-3"}>
                    <label htmlFor={"type"}>type <span className={"text-danger"}>TUITION/HARDWARE</span></label>
                    <input type={"text"} name={"type"} id={"type"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.type) : ""}/>
                    <label htmlFor={"totalAmount"}>totalAmount</label>
                    <input type={"text"} name={"totalAmount"} id={"totalAmount"} required
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value.totalAmount) : ""}/>
                    <label htmlFor={"description"}>description</label>
                    <input type={"text"} name={"description"} id={"description"}
                           className={"form-control"} onChange={inputChangeValue}
                           value={value ? (value!.description == null ? "" : value!.description) : ""}/>
                    <div className={"mt-3"}>
                        <select name={"student"} id={"student"}
                                onChange={inputChangeValue}
                                className="btn btn-sm btn-outline-secondary">
                            <option
                                value={value ? (value!.student == null ? undefined : value!.student.id == null ? undefined : value!.student.id) : undefined}
                                selected={true}>
                                {value ? (value!.student == null ? "select student" : value!.student.lastname + " " + value!.student.firstname) : "select student"}
                            </option>
                            {
                                (studentsList || []).map((student: StudentType) => {
                                    return (
                                        <option key={student.id} value={student.id == null ? undefined : student.id}>
                                            {student.lastname + " " + student.firstname}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={"mt-3"}>
                        <select name={"schoolYear"} id={"schoolYear"}
                                onChange={inputChangeValue}
                                className="btn btn-sm btn-outline-secondary">
                            <option
                                value={value ? (value!.schoolYear == null ? undefined : value!.schoolYear.id == null ? undefined : value!.schoolYear.id) : undefined}
                                selected={true}>
                                {
                                    value ?
                                        (value!.schoolYear == null ? "select school year" : value!.schoolYear.startYear + "-" + value!.schoolYear.endYear) :
                                        "select school year"
                                }
                            </option>
                            {
                                (selectSchoolYear || []).map((schoolYear: SchoolYearType) => {
                                    return (
                                        <option key={schoolYear.id}
                                                value={schoolYear.id == null ? undefined : schoolYear.id}>
                                            {schoolYear.startYear + "-" + schoolYear.endYear}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </form>
            <button className={"btn btn-secondary"} onClick={onSubmit}>Submit</button>
        </>
    )
}
export default FeeModal;
