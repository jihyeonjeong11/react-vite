yarn create vite@latest

CRA환경이 아닌 react proj를 간단하게 만들어보기 위한 프로젝트

10/06 작성

10/14 test용 테이블 작성


# 실행법

yarn 혹은 npm i

이후 

yarn dev 혹은 npm dev로 실행합니다.

기본 주소는 localhost:5173입니다.


```
# npm 6.x
npm create vite@latest my-vue-app --template react
```

와 같은 방식으로 react를 추가해도 되나, 없이 할경우 물어보기 때문에 그냥 해도 됨.

### 확인해볼 사항.

vite.config.ts 및 tsconfig.json에서 absolute path src/ => @/으로 변경한 것 확인 가능.




### 해야할것

테이블 전체를 components compounds 패턴으로 바꿀 것. 스위치는 그냥 지워도됨.

### 잘못한것

module.css 에서 tailwind apply하여 css 간섭일어남. 나중에 인라인으로 쓰도록 바꿀 것.