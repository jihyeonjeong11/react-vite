yarn create vite@latest

CRA환경이 아닌 react proj를 간단하게 만들어보기 위한 프로젝트

10/06 작성

10/14 test용 테이블 작성

10/17 테이블 템플릿 작성(Compound Components 패턴)

10/18 시험 작성 페이지 작성시작


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


10/18 최신화

### pending

[]작성한 테이블 템플릿 위 엔드포인트나 샘플 데이터가 나오면 시범적용
[]디자인 나오면 바꿀예정

### 해야할것

[x]react router dom v6 사용
[]react multi step form(시험 등록) 페이지
[]formik vs react-hooks-form 둘 중 하나 사용
[]sidebar component 코드 뺴기, tree structure 생성

[]rollup-bundle-anlyzer 사용 및 anlyze.html 생성

### 잘못한것



### 작업한 것 

10/18
ErrorBoundary Wrapper 추가
rollup-babel 추가

10/17
테이블 전체를 components compounds 패턴으로 바꿀 것. 스위치는 그냥 지워도됨. 

10/12
module.css 에서 tailwind apply하여 css 간섭일어남. 나중에 인라인으로 쓰도록 바꿀 것.

10/06 yarnv2로 이전하기

https://yarnpkg.com/getting-started/migration#switching-to-plugnplay

여기서 보고 ts 세팅까지를 하면 되겠다.

Run npm install -g yarn to update the global yarn version to latest v1
Go into your project directory
Run yarn set version berry to enable v2 (cf Install for more details)
If you used .npmrc or .yarnrc, you'll need to turn them into the new format (see also 1, 2)
Add nodeLinker: node-modules in your .yarnrc.yml file
Commit the changes so far (yarn-X.Y.Z.js, .yarnrc.yml, ...)
Run yarn install to migrate the lockfile
Take a look at this article to see what should be gitignored
Commit everything remaining
