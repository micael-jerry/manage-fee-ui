import React, {useState} from "react";
import './login.css'
import {BasicAuthType} from "../../../types";
import axios, {AxiosBasicCredentials} from "axios";
import {BASE_URL} from "../../../properties";

const Login: React.FC<{
    setCredentials: (val: any) => void
}> = (props) => {
    const {setCredentials} = props;
    const [value, setValue] = useState<AxiosBasicCredentials>({password: "", username: ""});

    const inputChangeValue = (event: any) => {
        let key = event.target.id;
        let value = event.target.value;
        if (key === "username") {
            setValue((state: any) => {
                return {...state, "username": value}
            });
        } else if (key === "password") {
            setValue((state: any) => {
                return {...state, "password": value}
            });
        }
    }

    const log = async () => {
        await axios({
            method: "get",
            url: BASE_URL + "/whoami",
            auth: value
        }).then((res) => {
            setCredentials(value);
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <img src="" id="icon" alt="HEI Icon"/>
                </div>

                <form>
                    <input type="text" id="username" className="fadeIn second" name="login" placeholder="username"
                           value={value.username == null ? "" : value.username}
                           onChange={inputChangeValue}
                    />
                    <input type="password" id="password" className="fadeIn third" name="login" placeholder="password"
                           value={value.password == null ? "" : value.password}
                           onChange={inputChangeValue}
                    />
                </form>
                <input type={"submit"} className="fadeIn fourth" value="Log In" onClick={log}/>

                <div id="formFooter">
                    <p className="underlineHover">This site is reserved for HEI managers</p>
                </div>

            </div>
        </div>
    )
}

export default Login;
