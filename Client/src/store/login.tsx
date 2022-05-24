import axios from "axios";
import { ACTION_LOGIN, ACTION_LOGOUT, initialLoginState } from "../const/action";
import { LoginState } from "../vo/loginStateVO";

export function actionLogIn(param: LoginState) {
    param.type = ACTION_LOGIN;
    return param;
}

export function actionLogOut() {
    return {
        type: ACTION_LOGOUT,
    };
}

export function asyncActionLogin(param: LoginState): any {
    return async function (dispatch: Function, state: any) {
        let response = await axios.post("http://203.240.133.185:3000/login", { id: param.id, pw: param.password });

        if (response.data.resultCode === "000") {
            return dispatch(actionLogIn(param));
        } else {
            alert(JSON.stringify(response.data));
            return dispatch(actionLogOut());
        }
    };
}

//* reducer */
export default function login(state = initialLoginState, action: any) {
    switch (action.type) {
        case ACTION_LOGIN:
            return {
                ...state,
                ...action,
            };
        case ACTION_LOGOUT:
            return initialLoginState;
        default:
            return state;
    }
}
