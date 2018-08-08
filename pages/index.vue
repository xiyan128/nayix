<template>
  <v-app>
    <!-- 边栏 -->
    <v-navigation-drawer fixed app width="400" :class="isMobile || 'my-2 mr-4 elevation-1 pb-0'" :height="isMobile ? '100%' : 'auto'"  style="::-webkit-scrollbar:none;"
      v-model="drawer">

      <!-- 顶部 -->
      <v-toolbar prominent class="pa-2 py-4 elevation-0" style="border-left: 5px solid #0D47A1;">
        <v-container fluid class="pa-0">
          <v-layout row>
            <v-avatar size="70" class="mr-3">
              <img :src="$store.state.user.avatar" alt="avatar">
            </v-avatar>
            <v-flex>
              <div class="title">{{ $store.state.user.nickname }}</div>
              <div class="body-2 grey--text text--darken-3">{{ $store.state.user.motto }}</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-toolbar>


      <!-- <v-divider></v-divider> -->

      <!-- 下面 -->
      <v-list class="pa-0">

        <v-list-tile style="border-left: 5px solid #0D47A1" nuxt to="/" ripple>
          <v-list-tile-content>
            <v-list-tile-title>主页</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-icon>home</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>

        <v-list-tile style="border-left: 5px solid #1565C0" nuxt to="/archive" ripple>
          <v-list-tile-content>
            <v-list-tile-title>归档</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-icon>archive</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>

        <v-list-tile style="border-left: 5px solid #1976D2">
          <v-list-tile-content>
            <v-list-tile-title>标签</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-icon>label</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>

        <div class="pa-2 px-4" style="border-left: 5px solid #1E88E5">
          <li class="ma-1" style="display:inline;" v-for="(tag, index) in $store.state.tags" :key="index">
            <nuxt-link :to="'/tag/'+tag.id">
              <v-chip>{{tag.name}}</v-chip>
            </nuxt-link>
          </li>
        </div>
        <v-list-tile style="border-left: 5px solid #42A5F5" nuxt to="/about" ripple>
          <v-list-tile-content>
            <v-list-tile-title>关于</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-icon>alternate_email</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>


        <!-- 脚注 -->
        <v-footer class="pa-3" :style="!isMobile || 'position:fixed;width:100%;bottom:0'">
          <strong>
            <nuxt-link to="/admin/manage">站长登录</nuxt-link>
          </strong>
          <v-spacer></v-spacer>
          <div>Xiyan Shao &copy; {{ new Date().getFullYear() }}</div>
        </v-footer>

      </v-list>

    </v-navigation-drawer>

    <!-- 主栏 -->
    <v-content>
      <v-container fluid style="max-width:1185px !important" :class="isMobile ? 'pa-0' : 'pa-2'">
        <v-card :flat="isMobile">
          <v-toolbar class="elevation-1" scroll-toolbar-off-screen>
          <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-flex md8 lg10>
            <v-toolbar-title>{{ getTitleName() }}</v-toolbar-title>
            </v-flex>
            <v-flex md4 lg2>
            <v-text-field hide-details prepend-icon="search" single-line label="搜索" clearable @click:prepend="search" @keyup.enter="search" v-model="keyword" required></v-text-field>
            </v-flex>
          </v-toolbar>
          <div class="pa-3">

            <nuxt-child/>
          </div>
        </v-card>
      </v-container>
    </v-content>
  </v-app>

</template>

<script>
export default {
  head () {
    return {
      title: this.$store.state.user.nickname
    }
  },
  created () {
    this.$vuetify.mdAndDown = false
  },
  data () {
    return {
      drawer: this.isMobile,
      keyword: ''
    }
  },
  methods: {
    search () {
      if (this.keyword.replace(/(^s*)|(s*$)/g, '').length !== 0) this.$router.push(`search/${this.keyword}`)
    },
    getTitleName () {
      switch (this.$route.name) {
        case 'index': return '主页'
        case 'index-archive': return '归档'
        case 'index-detail-id': return '文章'
        case 'index-search-key': return `"${this.$route.params.key}"的搜索结果`
        case 'index-tag-id': return '标签检索'
        case 'index-about': return '关于'
        default: return '未知'
      }
    }
  },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>
