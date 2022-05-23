//* action type *//
const INCREASE = "conuter/INCREASE";
const DECREASE = "conuter/DECREASE";

//* create action */
export function increase() {
    return {
        type: INCREASE,
    };
}

export function decrease() {
    return {
        type: DECREASE,
    };
}

export function asyncIncrease() {
    return function (dispatch: any, getState: any) {
        setTimeout(() => {
            dispatch(increase());
        }, 1000);
    };
}

export function asyncDecrease() {
    return function (dispatch: any, getState: any) {
        setTimeout(() => {
            dispatch(decrease());
        }, 1000);
    };
}

//* initialize variable0 */
const initializeState = 0;

//* reducer */
export default function counter(state = initializeState, action: any) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}
