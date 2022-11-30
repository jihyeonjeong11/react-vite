import { regexOption } from './../../../types/Global.d';
// form 유효성 검사에 사용할 목적의 정규표현식
const EmailEx = /^\S+@\S+\.\S+$/;
const MobilePhoneEx = /^0\d{9,10}$/;
const oneCharacter = /(\w|[가-힇])+?/;

/** react-hook-form validation */
const addRegex = (type:string):regexOption | undefined => {
    let result;
    switch (type) {
        case "email":
            result = { value: EmailEx, message: "유효하지 않은 이메일 형식입니다." };
            break;
        case "phone":
            result = { value: MobilePhoneEx, message: "전화번호를 정확히 입력해 주세요." };
            break;
    }
    return result;
}
const addRequired = { value: true, message: "필수 항목 입니다."};

export { addRegex, addRequired }