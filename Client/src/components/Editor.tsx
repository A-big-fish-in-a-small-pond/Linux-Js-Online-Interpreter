import Editor, { useMonaco } from "@monaco-editor/react";
import { RouterParameter } from "../vo/routerVO";

export default function EditorComponent<T extends RouterParameter>(arg: T): React.ReactElement {
    const monaco = useMonaco();

    monaco?.editor.defineTheme("my-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#292D3E",
            "peekViewEditor.background": "#FFFFFF",
        },
    });

    function handleEditorDidMount(editor: any, monaco: any) {
        arg.editorRef.current = editor;
    }

    function handleEditorDidMountOutput(editor: any, monaco: any) {
        arg.outputRef.current = editor;
    }

    return (
        <div className={arg.className}>
            {arg.className?.includes("main") && <Editor height="100%" theme="my-theme" defaultLanguage="javascript" defaultValue="// 코드를 작성하세요. " onMount={handleEditorDidMount} />}
            {arg.className?.includes("output") && <Editor height="100%" theme="my-theme" defaultLanguage="text/plain" defaultValue="" onMount={handleEditorDidMountOutput} />}
        </div>
    );
}
