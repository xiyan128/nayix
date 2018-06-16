<template>
  <v-app id="particles-js">

    <!-- 边栏 -->
    <v-navigation-drawer fixed app width="400" class="ma-2 mr-0 elevation-1 pb-0" height="auto" style="::-webkit-scrollbar:none;">

      <!-- 顶部 -->
      <v-toolbar prominent class="pa-2 py-4 elevation-0" style="border-left: 5px solid #1976D2;">
        <v-container fluid class="pa-0">
          <v-layout row>
            <v-avatar size="70" class="mr-3">
              <img src="https://pic1.zhimg.com/v2-7c05640ae359786953b458082c1cbf17_xll.jpg" alt="avatar">
            </v-avatar>
            <v-flex>
              <div class="title">zero</div>
              <div class="body-2 grey--text text--darken-3">专业讲废话，喜欢用问题的逻辑来回答问题，最喜欢吃栗子！</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- 下面 -->
      <v-list class="pa-0">
        <v-list-group v-for="item in items" v-model="item.active" :key="item.title" :prepend-icon="item.action" no-action class="py-0">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" :key="subItem.title">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

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
          <router-view></router-view>
        </v-card>
      </v-container>
    </v-content>
  </v-app>

</template>