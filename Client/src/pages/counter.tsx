import { useDispatch, useSelector } from "react-redux";
import { asyncDecrease, asyncIncrease } from "../store/counter";
import Editor from "@monaco-editor/react";
import { useRef } from "react";

export default function CounterContainer(): JSX.Element {
    const state = useSelector((state: any) => {
        return state.counter;
    });

    const dispatch: Function = useDispatch();

    const onIncrease = () => {
        dispatch(asyncIncrease());
    };

    const onDecrease = () => {
        dispatch(asyncDecrease());
    };

    const editorRef: any = useRef(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    function showValue() {
        alert(editorRef.current.getValue());
    }

    return (
        <div className="counter_container">
            <h2>{state}</h2>
            hello world
            <button onClick={onIncrease}>increase</button>
            <button onClick={onDecrease}>decrease</button>
            <button onClick={showValue}>show Value</button>
            <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" onMount={handleEditorDidMount} />
        </div>
    );
}
