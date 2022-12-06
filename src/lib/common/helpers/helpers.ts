/**
 * @param {Number} l - 배열 길이
 * @param {Any} v - 배열 값
 * @return {Array} 리턴하는 배열
 */

// 길이와
export const generateArrayFromLengthAndVal = (l: number = 0, v: any = 0) => {
    let result = new Array(l);
    for (let i = 0; i < l; ++i) result[i] = v;
    return result;
};

export const viewHeight = (): number => window.innerHeight;

export const viewWidth = (): number => window.innerWidth;

export const pxToNum = (value: number | string = 0): number =>
    typeof value === "number" ? value : Number.parseFloat(value);

/**
 * @param {isComponentTypeNeeded} boolean - 오브젝트 타입 표시여부
 * @param {objects} {}[] - 오브젝트 배열
 * @return {object} merge된 오브젝트
 */

export const mergeTwoObjects = (
    isComponentTypeNeeded: boolean,
    ...objects: any[]
) => {
    return objects.reduce((prev, next) => {
        Object.keys(prev).forEach((key) => {
            next[key] = { ...next[key], ...prev[key] };
        });
        return next;
    });
};

// https://hackernoon.com/lets-compose-promises-309a63225f8a

export const composePromise =
    (...functions: any[]) =>
    (initialValue: any) =>
        functions.reduceRight(
            (sum, fn) => Promise.resolve(sum).then(fn),
            initialValue
        );
