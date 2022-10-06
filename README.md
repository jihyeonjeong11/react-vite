yarn create vite@latest

CRA환경이 아닌 react proj를 간단하게 만들어보기 위한 프로젝트

10/06 작성

```
# npm 6.x
npm create vite@latest my-vue-app --template vue
```

와 같은 방식으로 react를 추가해도 되나, 없이 할경우 물어보기 때문에 그냥 해도 됨.



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