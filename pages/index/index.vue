<template>
  <div>

      <v-layout row wrap>
        <v-flex xs12 sm8>
          <h1 class="display-1 my-2">主页</h1>
        </v-flex>
          <v-flex xs12 sm4>
            <v-text-field append-icon="search" class="mx-0" label="搜索" clearable solo @click:append="search" @keyup.enter="search" v-model="keyword" required></v-text-field>
          </v-flex>
      </v-layout>

    

      <div>
        <articleItem v-bind="item" v-for="(item, index) in list" :key="index"></articleItem>
        <loadMoreItem :isNoMore="noMore" :isShowLoading="isShowLoading" @load-more="loadMore"></loadMoreItem>
    </div>
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
    },
    search () {
      if (this.keyword.replace(/(^s*)|(s*$)/g, '').length !== 0) this.$router.push(`search/${this.keyword}`)
    }
  }

}
</script>
