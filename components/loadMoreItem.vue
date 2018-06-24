<template>
  <v-card flat color="grey lighten-5">
    <v-card-title primary-title class="pa-3" @click="loadMore">
    <p v-show="!isNoMore && !isShowLoading" class="my-0 mx-auto grey--text text--darken-2"> 加载更多 </p>
    <p v-show="isNoMore" class="my-0 mx-auto grey--text text--darken-2"> 没有更多了 </p>
    <v-progress-circular indeterminate color="primary" v-show="isShowLoading" class="mx-auto" :size="25" :width="3"></v-progress-circular>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'loadMoreItem',
  props: {
    isNoMore: {
      type: Boolean,
      default: false,
      required: true
    },
    isShowLoading: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    loadMore () {
      this.$emit('load-more')
    }
  }
}
</script>


