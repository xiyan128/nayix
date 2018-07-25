<template>
  <div>
    <h1 class="display-1 my-2">关于</h1>
    <div class="markdown-body">
      <h1>Nayix</h1>
      <blockquote>
        <p>一个新的 MD 风格轻量级博客 WebApp</p>
      </blockquote>
      <h2>技术栈</h2>
      <ul>
        <li>后端
          <strong>Koa</strong> +
          <strong>Mongoose</strong>
        </li>
        <li> 前端
          <strong>Nuxt.js</strong> (
          <strong>Vue</strong> 的服务端渲染，
          <strong>Vuex</strong>、
          <strong>Vue Router</strong> 使用)、
          <strong>Vuetify</strong> (Material Design 风格的 Vue 组件库)、
          <strong>Stylus</strong>
        </li>
      </ul>
      <h2>功能实现</h2>
      <ul>
        <li>服务端渲染</li>
        <li> RSS 订阅</li>
        <li>标签检索</li>
        <li>全文搜索</li>
        <li>移动端适配</li>
        <li> Admin 后台管理</li>
      </ul>
      <h2>运行安装</h2>
      <pre><code class="language-bash hljs"><span class="hljs-comment"># 先安装好 MongoDB 和 Node.js 环境</span>
<span class="hljs-built_in">cd</span> nayix/
npm run install
<span class="hljs-comment"># 开发模式</span>
npm run dev
<span class="hljs-comment"># Nuxt 构建</span>
npm run build
<span class="hljs-comment"># 启动 nuxt</span>
npm run start
<span class="hljs-comment"># 启动后端服务器</span>
npm run startServer
</code></pre>
      <p>For detailed explanation on how things work, check out the
        <a href="https://github.com/nuxt/nuxt.js">Nuxt.js</a> and
        <a href="https://vuetifyjs.com/">Vuetify.js</a> documentation.</p>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  head () {
    return {
      title: '关于 - ' + this.$store.state.user.nickname
    }
  }
}
</script>

