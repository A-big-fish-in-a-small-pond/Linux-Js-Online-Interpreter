import { Terminal } from "xterm";
import { RouterParameter } from "../vo/routerVO";
import { useEffect } from "react";
import { FitAddon } from "xterm-addon-fit";
require("xterm/css/xterm.css");

export default function TerminalComponent<T extends RouterParameter>(arg: T): React.ReactElement {
    const term = new Terminal();
    const fitAddon = new FitAddon();

    useEffect(() => {
        const terminalContainer: any = document.getElementById("terminal-container");
        term.loadAddon(fitAddon);
        fitAddon.fit();

        return () => {
            term.open(terminalContainer);
            term.write(" $ ");
        };
    }, []);

    term.onKey((event: any) => {
        if (event.key === "\r") {
            term.write("\r\n $ ");
        } else if (event.key === "\x7F") {
            term.write("\b \b");
        } else {
            term.write(event.key);
        }
    });

    return (
        <div className="main2-terminal">
            <div className="main2-terminal-term" id="terminal-container"></div>
        </div>
    );
}
