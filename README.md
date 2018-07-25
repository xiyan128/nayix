# Nayix

> 一个新的 MD风格轻量级博客WebApp

## 技术栈

- 后端 **Koa** + **Mongoose**
- 前端 **Nuxt.js** (**Vue** 的服务端渲染，**Vuex**、**Vue Router** 使用)、**Vuetify** (Material Design 风格的 Vue 组件库)、**Stylus**

## 功能实现

- 服务端渲染
- RSS 订阅
- 标签检索
- 全文搜索
- 移动端适配
- Admin 后台管理

## 运行安装

``` bash
# 先安装好 MongoDB 和 Node.js 环境
cd nayix/
npm run install
# 开发模式
npm run dev
# Nuxt 构建
npm run build
# 启动 nuxt
npm run start
# 启动后端服务器
npm run startServer
```

For detailed explanation on how things work, check out the [Nuxt.js](https://github.com/nuxt/nuxt.js) and [Vuetify.js](https://vuetifyjs.com/) documentation.
