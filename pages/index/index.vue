<template>
  <div>
    <articleItem v-bind="item" v-for="(item, index) in list" :key="index"></articleItem>
    <loadMoreItem :isNoMore="noMore" :isShowLoading="isShowLoading" @load-more="loadMore"></loadMoreItem>
  </div>
</template>

<script>
export default {
  async asyncData ({ store }) {
    const pageLim = 10
    const page = 1
    let noMore = false

    const { data } = await store.dispatch('ARTICLES', { page, pageLim })
    noMore = data.length < pageLim
    return {
      list: data || [],
      pageLim,
      page,
      noMore
    }
  },
  data () {
    return {
      isShowLoading: false,
      keyword: ''
    }
  },
  head () {
    return {
      title: '主页 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    async loadMore () {
      if (this.noMore === true) return
      this.page += 1
      this.isShowLoading = true
      const { data } = await this.$store.dispatch('ARTICLES', { page: this.page, pageLim: this.pageLim })
      this.isShowLoading = false
      this.noMore = data.length < this.pageLim
      this.list.push(...data)
    }
  }

}
</script>
