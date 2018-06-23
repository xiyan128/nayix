<template>
  <div>
    <h1 class="display-1 my-2">{{getTagName()}}</h1>
      <div>
        <articleItem v-bind="item" v-for="(item, index) in lists" :key="index"></articleItem>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ store, route }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('TAGS', id)
    return {
      lists: data || []
    }
  },
  head () {
    return {
      title: '标签 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    getTagName () {
      return this.$store.state.tags.filter(element => element.id.match(this.$route.params.id))[0].name
    }
  }

}
</script>
