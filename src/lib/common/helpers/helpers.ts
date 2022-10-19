
/**
 * @param {Number} l - 배열 길이
 * @param {Any} v - 배열 값  
 * @return {Array} 리턴하는 배열
 */

// 길이와 
export const generateArrayFromLengthAndVal = (l: number = 0, v: any = 0) => {
    let result = new Array(l); for (let i=0; i<l; ++i) result[i] = v;
    return result;
}