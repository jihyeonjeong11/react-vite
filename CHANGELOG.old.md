2022.11.21    
1. 정아름·formControl.tsx     
    - placeholder 속성 추가
    - item에서 숫자(정수) 및 비밀번호 type 추가
    - item에서 input 태그 결정하는 switch문에서 case 축약하여 작성
    ⚠️ controls로 묶어둔 컴포넌트 모듈을 item(일반적인 input 및 textarea) 및 options(checkbox, select, radio 등 선택 요소)로 분리 후 삭제 처리    

2022.11.22    
1. 정아름·[form.tsx](src/components/common/forms/components/form.tsx)    
    - Form 사용 패턴 변경
    > (기존) Form과 FormItem, FormOptions를 모두 호출 → (변경 후) Form만 호출 후 객체 형태의 전체 양식을 props로 전달하면 Form 컴포넌트 내부적으로 FormItem과 FormOptions를 호출하여 mapping    
    - Form이 받는 양식 props를 state로 관리하려고 했으나 error에서 얕은 비교로 인한 유효성 검증 업데이트가 되지 않는 문제가 발생하여 state 제거(uncontroll component로 사용)    
2. 정아름·[FormItem.tsx](src/components/common/forms/components/formControl/FormItem.tsx)    
    - 부속 컴포넌트 명칭 명료하게 수정(LabelRoot → Label 등)    
    - 스타일링을 위한 클래스명 index.css로 이전하여 축약표시    
    - 입력항목 생성 switch문 useCallback으로 분리    
    - 실제로 props를 사용하는 경우를 제외한 나머지 전달 props는 rest 처리하여 단순화    
    - 최종 컴포넌트 FormItem에 대해 memo 처리    

2022.11.24
1. 정아름·[form.tsx](src/components/common/forms/components/form.tsx)    
    - defaultValue를 react hook form에서 처리해주는 것을 확인하여 초기 설정에 추가(register의 옵션)    
2. 정아름·[FormItem.tsx](src/components/common/forms/components/formControl/FormItem.tsx)    
    - defaultValue를 상위 컴포넌트(Form)에서 처리하게 되었으므로(1번 참고) 해당 속성 제외
3. 정아름·[FormOptions.tsx](src/components/common/forms/components/formControl/FormOptions.tsx)    
    - defaultValue를 상위 컴포넌트(Form)에서 처리하게 되었으므로(1번 참고) 해당 속성 제외하되, checkbox 타입은 유지함
