import Editor, { useMonaco } from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { RouterParameter } from "../vo/routerVO";
import $ from "jquery";

export default function EditorComponent<T extends RouterParameter>(arg: T): React.ReactElement {
    const monaco = useMonaco();
    const [drag, setDrag] = useState(false);
    const dragRef: any = useRef(null);
    const editor = $(".main-editor");

    monaco?.editor.defineTheme("my-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#292D3E",
        },
    });

    function handleEditorDidMount(editor: any, monaco: any) {
        arg.editorRef.current = editor;
    }

    function disableF5(e: any) {
        if ((e.which || e.keyCode) === 116) {
            e.preventDefault();
        }
    }

    const disableF5s = useCallback(disableF5, []);
    $(document).on("keydown", disableF5s);

    const handleMouseDown = useCallback(
        (e: any) => {
            e.preventDefault();
            if (drag == false) {
                // if (e.pageY === Number(editor.offset()?.top) + Number(editor.height())) {
                //     setDrag(true);
                //     // dragRef.current.addEventListener("mousemove", handleMouseMove);
                // }
                setDrag(true);
            }
        },
        [drag]
    );

    const handleMouseUp = useCallback(
        (e: any) => {
            e.preventDefault();
            if (drag) {
                console.log("mouse up");
                setDrag(false);
            }
        },
        [drag]
    );

    const handleMouseMove = useCallback(
        (e: any) => {
            e.preventDefault();
            if (drag) {
                editor.css("height", e.offsetY);
                console.log(e);
                console.log("gdgd");
            }
        },
        [drag]
    );

    const initDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("mousemove", handleMouseMove);
            dragRef.current.addEventListener("mousedown", handleMouseDown);
            dragRef.current.addEventListener("mouseup", handleMouseUp);
        }
    }, [handleMouseDown, handleMouseUp]);

    const resetDragEvents = useCallback(() => {
        if (dragRef.current !== null) {
            dragRef.current.removeEventListener("mousemove", handleMouseMove);
            dragRef.current.removeEventListener("mousedown", handleMouseDown);
            dragRef.current.removeEventListener("mouseup", handleMouseUp);
        }
    }, [handleMouseDown, handleMouseUp, handleMouseMove]);

    useEffect(() => {
        initDragEvents();
        return () => {
            resetDragEvents();
        };
    }, [drag]);

    return (
        <div className="main-editor" ref={dragRef}>
            <Editor height="100%" theme="my-theme" defaultLanguage="javascript" defaultValue="// some comment" onMount={handleEditorDidMount} />
        </div>
    );
}
