<template>
  <v-layout column justify-center align-center>

  </v-layout>
</template>

<script>
export default {
  async asyncData ({store, route}) {
    let page = route.params.id || 1
    const data = await store.dispatch('ARTICLES', page)
    return {
      articles: data.data || [],
      total: data.total
    }
  }
}
</script>
