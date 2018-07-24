<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>站长登录</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="user.username"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="user.password" @keyup.enter="login"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" style="width:100%" @click.native="login">Login</v-btn>
              </v-card-actions>
              <v-alert :value="true" type="error" v-if="error" class="subheading">用户名或密码错误！</v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        user: {},
        error: false
      }
    },
    head () {
      return {
        title: '登录 - ' + this.$store.state.user.nickname
      }
    },
    methods: {
      login () {
        this.error = false
        if (!this.user.username || !this.user.password) {
          console.log('err')
          return false
        }
        this.$store.dispatch('LOGIN', this.user).then(data => {
          if (data.success) {
            this.$router.push('/admin/manage')
          } else {
            this.error = true
          }
        })
      }
    }
  }
  </script>