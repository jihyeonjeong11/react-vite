import {useReducer, Reducer} from 'react';

const staticState = {
    'test': ['checkbox', '메인시험명', '시험종류', '학생배치', '그룹별 시험 정보', '대기 학생', 'PA 정보', '이벤트', '생성일자', '수정일자'],
    'class': ['checkbox', 'dddd']
}

export interface StaticStateProps {
    test: String[];
} 

const staticReducer = (state: StaticStateProps, action: string  ) => {
    switch(action){
        case 'test':
            return state[action];
        default :
            return state;
    }
}

const useTableStaticData = () => {
    const [state, dispatch] = useReducer<Reducer<any, string>>(staticReducer, staticState)
    return [state, dispatch]
}

export default useTableStaticData