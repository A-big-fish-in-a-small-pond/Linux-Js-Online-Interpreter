import React from "react";
import { useDispatch } from "react-redux";
import { actionLogOut } from "../store/login";
import { RouterParameter } from "../vo/routerVO";
import { BsX, BsPlayFill } from "react-icons/bs";
import axios from "axios";

export function HeaderComponent<T extends RouterParameter>(arg: T): React.ReactElement {
    const dispatch = useDispatch();

    async function showValue() {
        let a = await axios.post("http://localhost:3000/readText", arg.editorRef.current.getValue(), {
            headers: { "Content-Type": "text/plain" },
        });
        alert(JSON.stringify(a.data));
    }

    let onClick = () => {
        dispatch(actionLogOut());
        alert("로그아웃이 완료되었습니다. ");
    };

    return (
        <div className="main-header">
            <h2 className="main-header-filename">{arg.filename}</h2>
            <BsX className="main-header-bsx" size={"30px"} onClick={onClick}></BsX>
            <BsPlayFill className="main-header-bsf" size={"30px"} onClick={showValue}></BsPlayFill>
        </div>
    );
}
