export function checkKoreanParam(param: string): boolean {
    let regexp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return regexp.test(param);
}

export function checkSpaceParam(param: string): boolean {
    let regexp = / /;
    return regexp.test(param);
}
