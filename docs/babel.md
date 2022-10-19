```
plugins: [react({
      babel: {
        presets: ['@babel/preset-env'],
        babelrc: true,
        configFile: true,
      }
    })],
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
```

기본적인 바벨 세팅을 위해,

```

```