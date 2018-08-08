<template>
  <v-app>

    <!-- 边栏 -->
    <v-navigation-drawer fixed app width="400" :class="$vuetify.breakpoint.mdAndDown || 'my-2 mr-4 elevation-1 pb-0'" :height="$vuetify.breakpoint.mdAndDown ? '100%' : 'auto'"  style="::-webkit-scrollbar:none;"
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

          <v-list-tile style="border-left: 5px solid #0D47A1" nuxt to="/admin/compose" ripple>
            <v-list-tile-content>
              <v-list-tile-title>撰写</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon>create</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>

          <v-list-tile style="border-left: 5px solid #1565C0" nuxt to="/admin/manage" ripple>
            <v-list-tile-content>
              <v-list-tile-title>管理</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon>list_alt</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>

          <v-list-tile style="border-left: 5px solid #1976D2" nuxt to="/admin/drafts" ripple>
            <v-list-tile-content>
              <v-list-tile-title>草稿</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon>drafts</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>


        <!-- 脚注 -->
        <v-footer class="pa-3" :style="$vuetify.breakpoint.lgAndUp || 'position:fixed;width:100%;bottom:0'">
          <strong>
            <a @click="logout">退出登录</a>
          </strong>
          <v-spacer></v-spacer>
          <div>Xiyan Shao &copy; {{ new Date().getFullYear() }}</div>
        </v-footer>

      </v-list>

    </v-navigation-drawer>

    <!-- 主栏 -->
    <v-content>
      <v-container fluid style="max-width:1185px !important" :class="$vuetify.breakpoint.mdAndDown ? 'pa-0' : 'pa-2'">
        <v-card :flat="$vuetify.breakpoint.smAndDown">
          <v-toolbar class="elevation-1" scroll-toolbar-off-screen>
            <v-toolbar-side-icon v-if="!drawer" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{ getTitleName() }}</v-toolbar-title>
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
  // 鉴权
  middleware: 'auth',
  head () {
    return {
      title: this.$store.state.user.nickname
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT').then(data => {
        if (data.success) {
          this.$store.state.token = ''
          this.$router.push('/')
        }
      })
    },
    getTitleName () {
      switch (this.$route.name) {
        case 'admin-compose-id': return '撰写'
        case 'admin-manage': return '管理'
        case 'admin-drafts': return '草稿'
        default: return '未知'
      }
    }
  },
  data () {
    return {
      drawer: !this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
