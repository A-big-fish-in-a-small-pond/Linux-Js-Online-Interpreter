import { Action } from "./actionVO";

export interface LoginState extends Action {
    id: string | undefined;
    password: string | undefined;
}

export interface LoginSelectorState {
    login: LoginState;
}
