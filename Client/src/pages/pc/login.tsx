import { StyledButton } from "../../components/Button";
import LoginLogo from "../../asset/img/login_logo.png";
import { StyledInput } from "../../components/Input";
import React, { useState } from "react";
import { checkKoreanParam, checkSpaceParam } from "../../utils/string";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { asyncActionLogin } from "../../store/login";
import $ from "jquery";
import { LoginSelectorState, LoginState } from "../../vo/loginStateVO";
import { RouterParameter } from "../../vo/routerVO";

export default function LoginRoutePC<T extends RouterParameter>(arg: T): React.ReactElement {
    const [id, setID] = useState("");
    const [pw, setPW] = useState("");
    const dispatch = useDispatch();
    const state: LoginState = useSelector((state: LoginSelectorState) => {
        return state.login;
    });

    const onChangeID = <T extends HTMLInputElement>(e: React.ChangeEvent<T>): void => {
        let value: string = e.target.value;

        if (checkKoreanParam(value)) {
            alert("아이디에 한글을 포함할 수 없습니다.");
            value = value.slice(0, value.length - 1);
        }

        if (checkSpaceParam(value)) {
            alert("아이디에 공백을 포함할 수 없습니다.");
            value = value.slice(0, value.length - 1);
        }

        return setID(value);
    };

    const onChangePW = <T extends HTMLInputElement>(e: React.ChangeEvent<T>): void => {
        let value: string = e.target.value;
        if (value.length > 1) {
            $(".login-button").css("opacity", "1.0");
        } else {
            $(".login-button").css("opacity", "0.5");
        }

        return setPW(value);
    };

    const onKeyPress = <T extends {}>(e: React.KeyboardEvent<T>): void => {
        if (e.key === "Enter") onClick(undefined);
    };

    const onClick = <T extends {}>(e: React.MouseEvent<T> | undefined) => {
        dispatch(asyncActionLogin({ id: id, password: pw }));
    };

    if (state.id !== "" && state.password !== "") {
        return <Navigate to={`/main`} replace />;
    }

    return (
        <div className="login">
            <div className="login-header"></div>
            <div className="login-content">
                <img src={LoginLogo} alt={"로고 이미지"}></img>
                <div className="login-content-form">
                    <h2>로그인 정보를 입력하세요.</h2>
                    <StyledInput className="login-id" name={"id"} type={"text"} placeholder="아이디" value={id} onChange={onChangeID}></StyledInput>
                    <StyledInput className="login-password" type={"password"} placeholder="비밀번호" onChange={onChangePW} onKeyPress={onKeyPress}></StyledInput>
                    <StyledButton className="login-button" onClick={onClick}>
                        Login
                    </StyledButton>
                </div>
            </div>

            <div className="login-footer"></div>
        </div>
    );
}
