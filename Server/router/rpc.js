import jayson from "jayson";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import iconv from "iconv-lite";

function isDirectory(thePath) {
    return fs.existsSync(thePath) && fs.statSync(thePath).isDirectory();
}

const methods = {
    speak: function (id) {
        console.log(id);
        return {
            id: id,
        };
    },
    getEnvironment: (methods) => {
        return {
            path: process.cwd(),
            hostname: "jhkim-dev",
        };
    },

    login: function (id, password, methods) {
        const result = {
            user: id,
            password: password,
            environment: methods.getEnvironment.handler(methods),
        };

        return result;
    },

    setEnvironment: function (state, methods) {
        if (isDirectory(state.environment.path)) {
            process.chdir(state.environment.path);
        } else {
            process.chdir("~");
        }
    },

    cd: function (state, param, methods) {
        methods.setEnvironment.handler(state, methods);
        param = param[0];

        if (param) {
            if (isDirectory(param)) {
                process.chdir(param);
            }
        }

        return {
            ...state,
            environment: methods.getEnvironment.handler(methods),
        };
    },

    run: function (state, param, methods) {
        methods.setEnvironment.handler(state, methods);

        let output = param ? executeCommand(param) : "";
        if (output && output.substr(-1) === "\n") {
            output = output.substr(0, output.length - 1);
        }

        return {
            ...state,
            output,
        };
    },

    completion: function (state, pattern, methods) {
        let scanPath = "";
        let completionPrefix = "";
        let completion = [];

        methods.setEnvironment.handler(state, methods);

        if (pattern) {
            if (!isDirectory(pattern)) {
                pattern = path.dirname(pattern);
                pattern = pattern === "." ? "" : pattern;
            }
            if (pattern) {
                if (isDirectory(pattern)) {
                    scanPath = completionPrefix = pattern;
                    if (completionPrefix.substr(-1) !== "/") {
                        completionPrefix += "/";
                    }
                }
            } else {
                scanPath = process.cwd();
            }
        } else {
            scanPath = process.cwd();
        }

        if (scanPath) {
            // Loading directory listing
            completion = fs.readdirSync(scanPath);
            completion.sort(String.naturalCompare);

            // Prefix
            if (completionPrefix && completion.length > 0) {
                completion = completion.map((c) => completionPrefix + c);
            }
            // Pattern
            if (pattern && completion.length > 0) {
                completion = completion.filter((c) => {
                    return pattern === c.substr(0, pattern.length);
                });
            }
        }

        return {
            completion,
        };
    },
};

function executeCommand(command) {
    return execSync(`${command} 2>&1`, {
        encoding: "utf8",
    });
}

const RPCServer = jayson.server(methods, {
    router(method, params) {
        return (p, cb) => {
            try {
                const result = this._methods[method].handler(...p, this._methods);
                cb(null, result);
            } catch (e) {
                console.log(e);
                const error = {
                    code: 500,
                    message: e.message || "Internal Error",
                };
                cb(error);
            }
        };
    },
});
export { RPCServer };
