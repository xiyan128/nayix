<template>
  <div>
    <articleItem v-bind="item" v-for="(item, index) in list" :key="index"></articleItem>
    <v-alert :value="true" type="error" v-if="list.length==0" class="subheading">
      非常遗憾，搜索无果
    </v-alert>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    // Must be a number
    return params.key
  },
  async asyncData ({ store, route }) {
    let key = route.params.key || ''
    const { data } = await store.dispatch('SEARCH', key)
    return {
      list: data || []
    }
  },
  head () {
    return {
      title: '标签 - ' + this.$store.state.user.nickname
    }
  }
}
</script>
