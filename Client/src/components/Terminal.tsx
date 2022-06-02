import { RouterParameter } from "../vo/routerVO";
import { useCallback, useEffect } from "react";
import $ from "jquery";
import jt from "jquery.terminal";
import "jquery.terminal/css/jquery.terminal.min.css";

type Paramter = (string | number | RegExp | object)[];
let terminal: JQueryTerminal<HTMLElement>;

export default function TerminalComponent<T extends RouterParameter>(arg: T): React.ReactElement {
    const loginState = true;
    let state = {};

    const interpreter: <T extends string, B extends JQueryTerminal<HTMLElement>>(command: T, terminal: B) => void = (command, terminal) => {
        const parse = $.terminal.parse_command(command);
        let method: string;
        let parameters: Paramter;

        if (parse.name.toLowerCase() === "cd") {
            method = "cd";
            parameters = [parse.args.length ? parse.args[0] : ""];
        } else {
            method = "run";
            parameters = [command];
        }

        if (method == "cd") {
            console.log("method : " + method);
            console.log("parameters : " + parameters);

            service(method, [state, parameters], (result: any) => {
                state = result;
                setTimeout(() => {
                    updatePrompt(terminal, state);
                }, 0);
            });
        } else if (method == "run") {
            console.log("method : " + method);
            console.log("parameters : " + parameters);

            service(method, [state, parameters], (result: any) => {
                showOutput(result.output.toString("euc-kr"));
            });
        }
    };

    const completion = useCallback((pattern: string, callback: Function) => {
        const token = terminal.token();

        if (token) {
            service("completion", [state, pattern], (result: any) => {
                if (result.completion && result.completion.length) {
                    result.completion.reverse();
                    callback(result.completion);
                }
            });
        }
    }, []);

    useEffect(() => {
        jt(Window, $);
        terminal = $(".main2-terminal-term").terminal(interpreter, {
            login: loginState ? login : false,
            completion: completion,
            prompt: makePrompt(null),
            height: $(".main2-terminal").height(),
        });

        return () => {};
    }, []);

    function service<T extends {}>(method: string, parameter: Paramter, callback: Function) {
        $.jrpc("http://localhost:3001/rpc", method, parameter, function (json) {
            callback(json.result);
        });
    }

    function login(user: string, password: string, callback: Function) {
        user = $.trim(user || "");
        password = $.trim(password || "");

        if (user && password) {
            service("login", [user, password], (result: any) => {
                if (result && result.user && result.password) {
                    state = result;
                    setTimeout(() => {
                        updatePrompt(terminal, state);
                    }, 0);

                    callback(result.user);
                }
            });
        } else {
            callback(null);
        }
    }

    function showOutput(output: string | Array<any> | object) {
        if (output) {
            if (typeof output === "string") {
                terminal.echo(output);
            } else if (output instanceof Array) {
                terminal.echo(
                    $.map(output, function (object) {
                        return JSON.stringify(object);
                    }).join(" ")
                );
            } else if (typeof output === "object") {
                terminal.echo(JSON.stringify(output));
            } else {
                terminal.echo(output);
            }
        }
    }

    // Prompt
    function makePrompt(state: any) {
        if (state != null) {
            return `[[b;#d33682;]${state.environment.user || "user"}]@[[b;#6c71c4;]${state.environment.hostname || "node-web-console"}]@[[b;#3A7FF4;]${state.environment.path || "~"}][[b;#98456F;]$] `;
        } else {
            return `[[b;#d33682;]${"user"}]@[[b;#6c71c4;]${"node-web-console"}]${"~"}$ `;
        }
    }

    function updatePrompt(terminal: JQueryTerminal<HTMLElement>, state: any) {
        terminal.set_prompt(makePrompt(state));
    }

    return (
        <div className="main2-terminal">
            <div className="main2-terminal-term"></div> {/* <div className="main2-terminal-term" id="terminal-container"></div> */}
        </div>
    );
}
