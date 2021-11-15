# guess number

> 基于[Taro-Mortgage-Calculator
](https://github.com/wuba/Taro-Mortgage-Calculator)模板开发

基于Taro 3开发的多端（React Native、Weapp、H5）实例


> 开发React Native， 推荐阅读[React Native 端开发流程](https://nervjs.github.io/taro/docs/3.2.0-canary.3/react-native)和[React Native 端开发前注意](https://nervjs.github.io/taro/docs/3.2.0-canary.3/react-native-remind)


### 项目介绍

目录结构：
```
├── config
├── global.d.ts
├── metro.config.js // Taro 3 RN metro 配置文件
├── package.json
├── project.config.json
├── src
│   ├── app.config.ts
│   ├── app.rn.scss // 针对RN的单独样式
│   ├── app.scss
│   ├── app.ts
│   ├── assets
│   ├── components // 封装的一些多端组件
│   ├── index.html
│   ├── pages
│   └── utils
├── tsconfig.json
└── yarn.lock
```

此项目旨在为Taro 3开发多端应用提供一个可参考的案例，封装一些支持多端的组件，提供一份开发多端应用的思路、技巧，能够快速上手开发

## 使用 Taro Playground 预览

0. 下载安装 [Taro Playground](https://github.com/wuba/taro-playground#app-download)。
1. 本地运行 `yarn dev:rn`，打印二维码。
2. 使用 APP 扫描二维码加载 bundle，进行预览。

## 本地运行

```
  # clone到本地
  git clone https://github.com/wuba/Taro-Mortgage-Calculator.git
  
  # 进去项目根目录
  cd Taro-Mortgage-Calculator
  
  # 安装依赖
  yarn
  
  # 运行RN 默认端口8081
  yarn dev:rn

  # 运行微信小程序
  yarn dev:weapp

  # 运行H5
  yarn dev:h5
```

## apk打包

下载 `taro-native-shell` 壳工程

```shell
git clone git@github.com:NervJS/taro-native-shell.git
```

`guessNumber` 项目打包

```
yarn build:rn
```

打包后将 `android` 文件夹内所有文件拷贝到`taro-native-shell/android/app/src/main/assets`

进入`taro-native-shell`

安装依赖

```shell
yarn
```


生成 APK （详情参考[https://reactnative.cn/docs/signed-apk-android]）

```shell
cd android
./gradlew assembleRelease
```

# note

### release 之后http无法发起请求

> https://blog.csdn.net/z372574152/article/details/105100524

```
android:usesCleartextTraffic="true"
```
