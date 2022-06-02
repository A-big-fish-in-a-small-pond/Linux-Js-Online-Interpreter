import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EditorComponent from "../../components/Editor";
import { HeaderComponent } from "../../components/Header";
import { LoginSelectorState, LoginState } from "../../vo/loginStateVO";
import { RouterParameter } from "../../vo/routerVO";
import $ from "jquery";
import { LoadingState } from "../../vo/lodingStateVO";
import LoadingComponent from "../../components/Loading";
import TerminalComponent from "../../components/Terminal";

export default function MainRoutePC<T extends RouterParameter>(arg: T): React.ReactElement {
    const state: LoginState = useSelector((state: LoginSelectorState) => {
        return state.login;
    });

    const loadingState: LoadingState = { loading: true };

    const editorRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLInputElement>(null);
    const editorHeightRef = useRef<HTMLDivElement>(null);

    const [drag, setDrag] = useState<boolean>(false);

    const handleMouseDown = useCallback(
        <T extends MouseEvent>(e: T): void => {
            if (drag === false) {
                let editorHeight = Number(editorHeightRef.current?.children.item(1)?.clientHeight) + 30;
                let min = editorHeight - 10;
                let max = editorHeight + 10;

                if (e.pageY >= min && e.pageY <= max) {
                    setDrag(true);
                }
            }
        },
        [drag]
    );

    const handleMouseUp = useCallback(
        <T extends MouseEvent>(e: T): void => {
            if (drag) {
                setDrag(false);
            }
        },
        [drag]
    );

    const handleMouseMove = useCallback(
        <T extends MouseEvent>(e: T): void => {
            if (drag) {
                const editor = $(".main-editor");
                editor.css({ height: e.pageY - 30 });
            }
        },
        [drag]
    );

    const initDragEvents = useCallback(<T extends {}>(): void => {
        if (editorHeightRef.current !== null) {
            editorHeightRef.current.addEventListener("mousemove", handleMouseMove);
            editorHeightRef.current.addEventListener("mousedown", handleMouseDown);
            editorHeightRef.current.addEventListener("mouseup", handleMouseUp);
        }
    }, [handleMouseDown, handleMouseUp, handleMouseMove]);

    const resetDragEvents = useCallback(<T extends {}>(): void => {
        if (editorHeightRef.current !== null) {
            editorHeightRef.current.removeEventListener("mousemove", handleMouseMove);
            editorHeightRef.current.removeEventListener("mousedown", handleMouseDown);
            editorHeightRef.current.removeEventListener("mouseup", handleMouseUp);
        }
    }, [handleMouseDown, handleMouseUp, handleMouseMove]);

    useEffect(() => {
        initDragEvents();
        return () => {
            resetDragEvents();
        };
    }, [drag]);

    if (state.id === "" && state.password === "") {
        return <Navigate to={`/login`} replace />;
    }

    return (
        <div className="main">
            <div className="main-1" ref={editorHeightRef}>
                <HeaderComponent filename={"index.js"} editorRef={editorRef} outputRef={outputRef}></HeaderComponent>
                <EditorComponent className="main-editor" loginState={state} editorRef={editorRef}></EditorComponent>
                <EditorComponent className="output-editor" loginState={state} outputRef={outputRef}></EditorComponent>
            </div>
            <div className="main-2">
                {/* {loadingState.loading == true && <LoadingComponent></LoadingComponent>} */}
                <TerminalComponent></TerminalComponent>
            </div>
        </div>
    );
}
