<template>
  <div>
    <h1 class="display-1 my-2">归档</h1>
    <div v-for="(archive, index) in archives" :key="index">
      <h3>{{ archive.date }}({{ archive.total }})</h3>
      <v-divider class="my-2"></v-divider>
          <div v-for="(item, index) in archive.articles" :key="index">
          <div style="width:100%">
            <div class="title my-2" style="overflow:hidden">
              <span class="subheading" style="color:rgb(0,0,0,0.54)">{{ item.createdAt | formatDate('MM-dd')}} </span>
              <nuxt-link :to="'/detail/'+item.id">{{item.title}}</nuxt-link>
              <v-chip v-for="(tag,index) in item.tags" :key="index" small label>
                <nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link></v-chip>
            </div>
          </div>
          </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ store }) {
    const { data } = await store.dispatch('ARCHIVES')
    return {
      archives: data || []
    }
  },
  head () {
    return {
      title: '归档 - ' + this.$store.state.user.nickname
    }
  }
}
</script>