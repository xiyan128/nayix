<template>
  <div>
    <h1 class="display-1 my-2">主页</h1>
      <div>
        <articleItem v-bind="item" v-for="(item, index) in lists" :key="index"></articleItem>
        <loadMoreItem :isNoMore="false" :isShowLoading="true"></loadMoreItem>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ store }) {
    const { data } = await store.dispatch('ARTICLES')
    return {
      lists: data || []
    }
  },
  head () {
    return {
      title: '主页 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
  }

}
</script>
