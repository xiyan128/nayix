import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import articleItem from '../components/articleItem.vue'
import markdown from '../components/markdown.vue'
import loadMoreItem from '../components/loadMoreItem.vue'

const components = { articleItem, markdown, loadMoreItem }

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

Vue.use(VueHighlightJS)
