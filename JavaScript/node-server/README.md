

### node-server

---

#### 基本功能

实现一个简易可扩展能处理路由解析和支持静态目录的 server

---

#### 目录结构

```
├── README.md
├── sample
│   ├── 404.html
│   ├── img
│   │   ├── 404.jpg
│   │   └── node.png
│   ├── index.html
│   ├── index.js
│   └── style.css
└── server.js

```


---

#### 基本实现
使用`node.js`的核心模块http模块来创建一个HTTP服务器，并且设置端口来监听客户端的请求和服务器的响应。`server.js`是服务器的核心文件，主要处理路由解析和支持访问静态文件。




