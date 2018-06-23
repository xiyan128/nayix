import Vue from 'vue'
import articleItem from '../components/articleItem.vue'

const components = { articleItem }

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
