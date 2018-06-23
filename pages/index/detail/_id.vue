<template>
  <div>
    <h1 class="display-1 my-2">{{article.title}}</h1>
    <div class="grey--text subheading">
      {{article.createdAt.substring(0,10)}} | 
      <span v-for="(tag,index) in article.tags" :key="index"><nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link> | </span>
      </div>
    <markdown :content="article.content" :options="option" v-highlightjs></markdown>
  </div>
</template>

<script>
export default {
  async asyncData ({ store, route }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('ARTICLE_DETAIL', id)
    return {
      article: data || {}
    }
  },
  head () {
    return {
      title: this.article.title + ' - ' + this.$store.state.user.nickname
    }
  },
  methods: {
  },
  data () {
    return {
      option: {}
    }
  }

}
</script>
