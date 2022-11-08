
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

export const mergeTwoObject = (
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
