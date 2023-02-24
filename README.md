## hungry-task


### HTML/CSS

#### 技术栈
`Git`、 `GitHub`、`Markdown`、 `命令行`、 `编辑器`、 `语义化`、 `标签使用`、 `Form 表单`、 `切图`、 `选择器`、 `常见样式`、 `浏览器调试`、 `盒模型`、 `浮动`、 `定位`、 `边距合并`、 `负边距`、 `BFC`、 `居中`、 `常见布局`、 `CSS兼容`、 `字体图标`、 `编码规范`等

---


### JavaScript

#### 技术栈
`浏览器渲染机制`、`运算符优先级`、`函数声明`、 `函数表达式`、 `声明前置`、 `作用域链`、 `引用类型`、 `ES5数组`、`IIFE` `对象拷贝`、 `字符串/数组/Math/正则`、 `DOM增删改查`、 `事件模型(冒泡、捕获、事件代理、取消默认)`、 `BOM`、 `闭包`、 `服务器搭建`、 `动画`、 `Ajax(Mock数据)`、 `跨域`、 `jQuery` `DOM操作/属性操作/事件/Ajax`、 `Promise` `原型`、 `原型链`、 `继承`、 `this`、 `模块模式`、`发布订阅模式`、 `AMD/CMD/UMD规范、 Require.js/R.js`、 `Node入门`、 `NPM使用(开发命令行工具)`、 `工程化(Gulp、NPM Script)`、 `WebPack入门`等

----

### 项目预览

#### 常见的组件

- [lazyimg](https://chunge16.github.io/hungry-task/JavaScript/lazyimg/)
- [tabs](https://chunge16.github.io/hungry-task/JavaScript/js-component-tab/)
- [waterfall-sinanews](https://chunge16.github.io/hungry-task/JavaScript/waterfall-sinanews/)

---

#### weather

**项目说明**：

通过Ajax获取当地或选择其他城市的天气预报网站

**关键词**： `Ajax` `jQuery` `DOM` `CSS` `布局`等

**项目预览**： [weather](http://chunge2016.online/hungry-task/JavaScript/weather/)

---

#### npm-get-weather

**项目说明**：  基于`Node`的查询天气的命令行工具，可以通过命令行来查询当地或其他城市的天气。发布一个Node包首先注册npm账号，然后新建项目通过登录npm账号publish该项目即可，通过修改package.json，加入 bin 字段，即可开发命令行工具。

```
npm install -g npm-get-weather

weather [city]

Hi, this is weather report app

```

**关键词**： `npm` `Promise` `模块化` `node`等

**项目预览**： [npm-get-weather](https://www.npmjs.com/package/npm-get-weather)


---

#### wheel-MVVM

**项目说明**：实现一个 微型的MVVM 框架，主要包括指令、单向和双向数据绑定。主要核心原理是两部分：数据监控和模板解析。通过Object.defineProperty实现对data数据的监听，而初始化View时涉及该数据的模板或指令进行解析处理；这里还涉及到观察者模式，主题（Subject）可以看做是Model里的数据，而观察者（Observer）就是View用到该数据的指令或模板，当数据一旦改变时就会通知所有订阅者更新。


**关键词**：`JavaScript` `MVVM` `DOM`等

**项目预览**： [wheel-MVVM](https://chunge16.github.io/hungry-task/JavaScript/wheel-MVVM/)

---
#### node-server

**项目说明**：实现一个简易可扩展能处理路由解析和支持静态目录的 server。基本原理是基于Node的http模块创建HTTP服务器，根据http请求里的信息来进行相应的处理，例如URL的path信息来处路由解析等问题。

**关键词**：`JavaScript` `Node` `服务器搭建` `HTTP`等

**查看源码**： [node-server](https://github.com/chunge16/hungry-task/tree/master/JavaScript/node-server)

---
#### Music-FM


**项目说明**：实现一个播放音乐的FM播放器。首先使用Audio对象自身的需要API来处理需要相应的处理逻辑，其次通过请求第三方线上音乐接口API来获取数据，最后通过相应的静态页面来实现整体播放器的交互逻辑。

**关键词**：`JavaScript` `DOM` `Ajax` `CSS3`等

**项目预览**： [Music](https://chunge16.github.io/hungry-task/JavaScript/Music-FM/)
