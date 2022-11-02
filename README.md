yarn create vite@latest

CRA환경이 아닌 react proj를 간단하게 만들어보기 위한 프로젝트

10/06 작성

10/14 test용 테이블 작성

10/17 테이블 템플릿 작성(Compound Components 패턴)

10/18 데이터 등록 폼 작성 시작

10/22 작성 페이지 multi-step-stepper 작성

10/24 작성 페이지 form 작성을 위한 라이브러리 스터디 중(formik or React-Hook-Form)

10/25 testing library 추가, bundle visualizer 추가, 

10/27 폴더 스트럭쳐 변경, React.lazy 세팅을 위한 components, routes 이원화

10/28 컴포넌트 dynamic render 추가.

이제부터 스타일링 + 드래그 리사이징 작업 시작.

themeProvider부터 작업할 것인지???(테마를 만드는게 나을 것인지???)

10/31 processContext(instance), sessionContext(state) 작성시작(memoComponent만) react-rnd 기초예제 적용

11/01 sessionContext(instance state) 훅 작성중 react-rnd custom hook 작성중 
yarn zero-install의 설명 대로라면, cache 폴더를 gitignore에 넣지 않아도 아무 문제 없음.

node-modules -> normally over 1.0 gb 
.yarn/cache -> 100mb가 되기 떄문에, 그대로 올려도 문제 없다고 하여씅므로, gitignore 수정함.

11/02 session 개념을 정확히 이해하기 힘드므로, youtube를 보면서 차근차근 만들어 보기로 함,.

https://www.youtube.com/watch?v=Caa5WKf-Z0c&list=PLM88opVjBuU7xSRoHhs3hZBz3JmHHBMMN&index=13

useDraggableAndResizable 훅을 아래로 분리함.

1. 여기서는 useDraggable hook을 먼저 만든다.
2. useResizable, useRnd hook 작성중

이후 RndWindow 훅 작성하여, 위 memoComp를 제외할 예정.

draggable components

1. 카메라
2. 메모
3. 리모콘?(오른쪽 끝)
4. 문제 리스트
5. 맨 아래 아이콘 리스트?? 
6. ekg 변경 셀렉트??


# 실행법

yarn 혹은 npm i

이후 

yarn dlx @yarnpkg/sdks vscode

기존 node_modules 체계와 달리, typescript 디펜던시를 vscode에서 관리하게 합니다.

이후 tsx or ts 파일에서 

ctrl + shift + p 로 커맨드 팔레트 오픈

select typescript version 선택 후 

use workspace version을 선택해 줍니다.

에러가 사라졌다면,

yarn dev 혹은 npm dev로 실행합니다.


기본 주소는 localhost:5173입니다.

env파일은 따로 부탁드리면 전달 드립니다. -> docker 세팅 이전까지

**10/25 현재 powershell에서 env 파일 인식이 안되는 오류 있습니다.**


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

[x]draggable ui 스터디
[x]SafeComponent 작성(errorboundary wrapper)
[]react-hooks-form 둘 중 하나 사용
[]react multi step form 페이지

[] vs react-hooks-form 둘 중 하나 사용
[]sidebar component 코드 뺴기, tree structure 생성

[x]react router dom v6 사용
[x]formik 예시
[x]rollup-bundle-visualizer 사용 및 stats.html 생성

### 잘못한것



### 작업한 것 

11/1 minimize, maximize 생략(foreground zindex 구현필요)

10/24
FormIK example 추가.
다만 전체 form 을 rerender 하는 부분때문에

useRef 기반으로 작성된 react-hook-form 을 사용하는 것이 좋아 보임.

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
