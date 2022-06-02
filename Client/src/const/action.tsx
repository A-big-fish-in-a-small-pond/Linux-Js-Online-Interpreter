import { LoginState } from "../vo/loginStateVO";

export const ACTION_LOGIN = "login/login";
export const ACTION_LOGOUT = "login/logout";

export const initialLoginState: LoginState = {
    id: "",
    password: "",
    type: ACTION_LOGOUT,
};
