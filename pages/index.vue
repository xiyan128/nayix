<template>
  <v-app id="particles-js">

    <!-- 边栏 -->
    <v-navigation-drawer fixed app width="400" class="ma-2 mr-0 elevation-1 pb-0" height="auto" style="::-webkit-scrollbar:none;">

      <!-- 顶部 -->
      <v-toolbar prominent class="pa-2 py-4 elevation-0" style="border-left: 5px solid #0D47A1;">
        <v-container fluid class="pa-0">
          <v-layout row>
            <v-avatar size="70" class="mr-3">
              <img :src="$store.state.user.avatar" alt="avatar">
            </v-avatar>
            <v-flex>
              <div class="title">zero</div>
              <div class="body-2 grey--text text--darken-3">专业讲废话，喜欢用问题的逻辑来回答问题，最喜欢吃栗子！</div>
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

          <v-list-tile style="border-left: 5px solid #1565C0" nuxt to="/search" ripple>
            <v-list-tile-content>
              <v-list-tile-title>搜索</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon>search</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>

          <v-list-tile style="border-left: 5px solid #1976D2" nuxt to="/archive" ripple>
            <v-list-tile-content>
              <v-list-tile-title>归档</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon>archive</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>

          <v-list-tile style="border-left: 5px solid #1E88E5">
            <v-list-tile-content>
              <v-list-tile-title>标签</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon>label</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>

          <div class="pa-2 px-4" style="border-left: 5px solid #42A5F5">
            <li class="ma-1" style="display:inline;" v-for="(tag, index) in $store.state.tags" :key="index">
              <nuxt-link :to="'/tags/'+tag.id"><v-chip>{{tag.name}}</v-chip></nuxt-link>
            </li>
          </div>

           <v-list-tile style="border-left: 5px solid #64B5F6"  nuxt to="/about" ripple>
            <v-list-tile-content>
              <v-list-tile-title>关于</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon>alternate_email</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>


        <!-- 脚注 -->
        <v-footer class="pa-3">
          <strong class>Xiyan Shao</strong>
          <v-spacer></v-spacer>
          <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>
      </v-list>
    </v-navigation-drawer>

    <!-- 主栏 -->
    <v-content>
      <v-container fluid style="max-width:1185px !important" class="pa-2 pl-4">
        <v-card class="pa-3">
          <v-breadcrumbs class="pa-0">
            <v-breadcrumbs-item>a</v-breadcrumbs-item>
            <v-breadcrumbs-item>a</v-breadcrumbs-item>
            <v-breadcrumbs-item>a</v-breadcrumbs-item>
          </v-breadcrumbs>
          <v-divider class="mt-2"></v-divider>
          <nuxt-child/>
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
  }
}
</script>
