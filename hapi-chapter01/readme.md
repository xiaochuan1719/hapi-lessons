
## 一、基础项目工程创建
#### 1. 初始化 Node.js 项目
使用 `npm init -y` 生成项目工程的初始化 package.json 文件
```shell
npm init
```
#### 2. 安装 Hapi 模块
这里选择的是 Hapi V18 版本，为最新版
```shell
# 安装 Hapi
npm i @hapi/hapi

# 安装 nodemon
npm i -g nodemon
```
#### 3. 最基础的 Hapi 服务代码
在项目工程目录下，创建一个 `app.js` 文件作为服务的启动入口：
```javascript
// app.js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    server.route({
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Hello Hapi'
            }
        }
    })

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()

```

#### 4. 启动服务
```shell
node app.js

# 或者希望在编辑完源代码后，服务自动重启，可以使用 nodemon
nodemon app.js
```
启动完服务后，打开浏览器，访问 `http://127.0.0.1:3000` 

## 二、结构化项目工程重构
#### 项目工程化设计原则：
- 单业务模块化
- 模块二百行原则
- 同类模块分组化
- 配置文件分离
#### 1. 重新梳理项目工程目录
```
|--config                       # 项目配置目录
|    |--index.js                # 配置项目中的配置信息
|--models                       # 数据库 model
|--node_modules                 # node.js 的依赖目录
|--plugins                      # 插件目录
|--routes                       # 路由目录
|    |--hello-hapi.js           # 测试接口 hello-hapi
|--utils                        # 工具类相关目录
|--app.js                       # 项目入口文件
|--package.json                 # JS 项目工程依赖库
|--readme.md                    # 项目工程如何被使用的说明手册
```


#### 2. 分离路由配置
在 routes 目录添加一个 hello-hapi.js 文件：

```javascript
// routes/hello-hapi.js
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello Hapi'
        }
    }
]
```