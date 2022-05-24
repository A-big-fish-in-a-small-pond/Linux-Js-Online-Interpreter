import { useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EditorComponent from "../../components/Editor";
import { HeaderComponent } from "../../components/Header";
import { LoginSelectorState, LoginState } from "../../vo/loginStateVO";
import { RouterParameter } from "../../vo/routerVO";

export default function MainRoutePC<T extends RouterParameter>(arg: T): React.ReactElement {
    const state: LoginState = useSelector((state: LoginSelectorState) => {
        return state.login;
    });

    const editorRef: any = useRef(null);

    if (state.id === "" && state.password === "") {
        return <Navigate to={`/login`} replace />;
    }

    return (
        <div className="main">
            <HeaderComponent filename={"index.js"} editorRef={editorRef}></HeaderComponent>
            <EditorComponent loginState={state} editorRef={editorRef}></EditorComponent>
        </div>
    );
}
