<template>
  <v-list subheader>
    <div v-for="(archive, index) in archives" :key="index">
       <v-subheader class="subheading">{{ archive.date }}({{ archive.total }})</v-subheader>
          <v-list-tile v-for="(item, index) in archive.articles" :key="index">
          <v-list-tile-content style="width:100%">
            <div style="border-left: 2px solid #000000" class="pl-2">
              <v-list-tile-title style="font-weight:600">
              <nuxt-link :to="'/detail/'+item.id">{{item.title}}</nuxt-link>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <span v-for="(tag,index) in item.tags" :key="index"><nuxt-link :to="'/tag/'+tag.id">{{tag.name}}</nuxt-link> | </span>
               {{ item.createdAt | formatDate('MM-dd')}} 
            </v-list-tile-sub-title>
            </div>
          </v-list-tile-content>
          </v-list-tile>
    </div>
  </v-list>
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