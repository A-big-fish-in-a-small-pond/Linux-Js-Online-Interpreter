import { LoginSelectorState, LoginState } from "./loginStateVO";

export interface RouterParameter {
    children?: React.ReactElement;
    filename?: string;
    loginState?: LoginState;
    editorRef?: any;
}
