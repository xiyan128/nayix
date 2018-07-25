<template>
  <div>
    <h1 class="display-1 my-2">管理</h1>
    <div>
      <v-card flat color="grey lighten-5" v-for="(item, index) in list" :key="index">
        <v-card-title primary-title class="pa-3 mb-2">
          <v-layout justify-space-between row fill-height>
            <v-flex xs8 md10>
              <div style="width:100%">
                <nuxt-link :to="'/detail/'+item.id">
                  <div class="title mb-1">{{item.title}}</div>
                </nuxt-link>
                <div class="grey--text subheading hidden-xs-only">{{item.createdAt.substring(0,10)}} |
                  <span v-for="(tag,index) in item.tags" :key="index">
                    <nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link> | </span>{{item.views}} views</div>
              </div>
            </v-flex>
            <v-flex xs4 md2>
              <v-layout>
              <v-flex xs0 sm4></v-flex>
              <v-flex xs6 sm4><v-btn color="error" fab small dark flat @click="del(item.id)"><v-icon>delete</v-icon></v-btn></v-flex>
              <v-flex xs6 sm4><v-btn color="primary" fab small dark flat @click="edit(item.id)"><v-icon>edit</v-icon></v-btn></v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
      <loadMoreItem :isNoMore="noMore" :isShowLoading="isShowLoading" @load-more="loadMore"></loadMoreItem>
    </div>
        <v-snackbar v-model="tip" :color="tipColor" :timeout="6000" top>{{ tipMsg }}
      <v-btn flat @click="tip = false">关闭</v-btn>
    </v-snackbar>
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
      tip: false,
      tipColor: 'success',
      tipMsg: '',
      isShowLoading: false,
      keyword: ''
    }
  },
  head () {
    return {
      title: '管理 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    showTip (color, msg) {
      this.tipColor = color
      this.tipMsg = msg
      this.tip = true
    },
    del (id) {
      this.$store.dispatch('DELETE_ARTICLE', id).then((data) => {
        if (data.success) {
          this.showTip('success', '删除成功')
          this.pageLim = 10
          this.page = 1
          this.$store.dispatch('ARTICLES', { page: this.page, pageLim: this.pageLim }).then((data) => {
            this.list = data.data
          })
        }
      })
    },
    edit (id) {
      this.$router.push(`/admin/compose/${id}`)
    },
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
