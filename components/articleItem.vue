<template>
  <v-card flat color="grey lighten-5 mb-3">
    <v-card-title primary-title class="pb-0">
      <div>
        <nuxt-link :to="'/detail/'+id"><div class="title mb-1 single-line">{{title}}</div></nuxt-link>
        <div class="grey--text subheading single-line">{{createdAt.substring(0,10)}} | <span v-for="(tag,index) in tags" :key="index"><nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link> | </span>{{views}} views</div>
        <div class="limited"><div class="markdown-body" v-html="html"></div></div>
      </div>
    </v-card-title>
    <v-card-actions class="pt-1">
      <nuxt-link :to="'/detail/'+id"><v-btn flat color="primary">MORE<v-icon small right>keyboard_arrow_right</v-icon></v-btn></nuxt-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import MarkdownIt from 'markdown-it'
export default {
  name: 'articleItem',
  props: ['id', 'title', 'content', 'createdAt', 'tags', 'views'],
  data () {
    return {
      html: ''
    }
  },
  created () {
    let md = new MarkdownIt()
    let str = md.render(this.content)
    let mdArr = str.split(/\n/)
    let showSize = mdArr.length > 10 ? 10 : mdArr.length
    this.html = mdArr.slice(0, showSize).join('\n')
  }
}
</script>

<style lang="stylus" scoped>

.limited
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

</style>

