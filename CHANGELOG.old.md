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

2022.11.28
- 목록형 컴포넌트에 key 추가하여 잠재적 오류 방지    
- 커스텀 체크박스의 적용 방법 변경
> (기존) prop, logic 직접 작성 후 전달 → (변경 후) 특정 액션 형태를 사전 정의 후 골라서 사용    

1. 정아름·[Global.d.ts](src/types/Global.d.ts)
    - 사용상의 편의를 위해 required 항목의 message를 선택적 프로퍼티로 변경    
    - 커스텀 체크박스의 종류 타입 선언: "all"(모두 선택), "odd"(홀수 선택), "even"(짝수 선택)
2. 정아름·[FormOptions.tsx](src/components/common/forms/components/formControl/FormOptions.tsx)    
    - 커스텀 체크박스 로직 "모두 선택(all)" 작성 완료
    - dataKey를 받지 않아 전송 결과가 예측하지 못한 형태로 나오는 현상 수정(react hook form에서의 name이 현 로직에서는 dataKey에 해당하는데 name을 전달하여 일어난 오류)
    - 일부 체크박스 형태에서 controller 도입, 불필요한 hook(useCheckbox) 제거    

2022.11.29    
- FormGroup 삭제
1. 정아름·[Global.d.ts](src/types/Global.d.ts)
    - 11.28 때 required 항목의 message를 선택적 프로퍼티로 변경하는 것이 react hook form의 타입과 충돌을 일으켜 원복     
2. 정아름·[useCustomCheck.ts](src/components/common/forms/hooks/useCustomCheck.ts)    
    - 훅 내에서 사용되던 type들을 끌어올려 모듈 내 전역 스코프로 이동    
    - 배열 분해 할당 후 type이 OR로 묶이는 문제로 return 타입 지정
    - 불필요한 update 함수들 제거, setState() 함수 직접 사용
    - 기존 useCustomCheck 함수 checkGenerator로 명칭 변경하고 export 중지, 내부 함수로 사용
    - FormOptions에서 사용되던 makeCustomArray 함수를 이전 후 useCustomCheck으로 이름 변경하고 export    
        + 실질적으로 사용되는 함수를 훅으로 사용하도록 변경     
    - 커스텀 체크박스 로직 "짝수 선택(even)" 작성 완료
    - 커스텀 체크박스 로직 "홀수 선택(odd)" 작성 완료
3. 정아름·[FormOptions.tsx](src/components/common/forms/components/formControl/FormOptions.tsx)    
    - makeCustomArray 함수 useCustomCheck으로 이전     
    - 커스텀 체크박스 클릭 후 일반 체크박스 onChange event handler 부분으로 넘어가는 현상 막기 위해 if문 내에 return 추가
    - 커스텀 체크박스 event handler 내부에 effect 함수 추가
        + 커스텀 체크박스 이벤트가 서로 영향을 주는 현상 반영
