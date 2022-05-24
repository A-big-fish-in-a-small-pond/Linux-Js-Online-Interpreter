function hello<T>(arg1: T): T {
    return arg1;
}

hello("hello wolrd");

interface a {
    <T, B>(arg1: T, arg2: B): [T, B];
}

const test = <T extends {}>(arg: T): T => {
    return arg;
};

const test5 = <T, B>(arg1: T, arg2: B): T => {
    return arg1;
};

const test6: <T, B extends {}>(arg1: T, arg2: B) => [T, B] = a2;

function a2<T, B>(arg1: T, arg2: B): [T, B] {
    return [arg1, arg2];
}

let ab: a = a2;

interface b<T> {
    type: T;
}

function test2<T, B extends { toString: Function }>(arg1: T, arg2: B): b<B> {
    let s = { type: arg2 };
    return s;
}

interface c {
    <T, B>(arg1: T, arg2: B): [T, B];
}

function cFunc<T, B>(arg1: T, arg2: B): [T, B] {
    return [arg1, arg2];
}

let cc: c = cFunc;

interface d {
    print: <T extends {}, B extends {}>(arg1: T, arg2: B) => [T, B];
    length: number;
}

let dd: d = { print: cFunc, length: 10 };
