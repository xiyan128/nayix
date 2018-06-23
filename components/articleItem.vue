<template>
  <v-card flat color="grey lighten-5">
    <v-card-title primary-title class="pa-3 mb-2">
      <div style="width:100%">
        <nuxt-link :to="'/detail/'+id"><div class="title mb-1">{{title}}</div></nuxt-link>
        <div class="grey--text subheading">{{createdAt.substring(0,10)}} | <span v-for="(tag,index) in tags" :key="index">{{tag.name}} | </span>{{views}} views</div>
        <div>{{content | cutString(130)}}</div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'articleItem',
  props: ['id', 'title', 'content', 'createdAt', 'tags', 'views']
}
</script>
