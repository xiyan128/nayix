<template>
    <div>
        
    </div>
</template>

<script>
export default {
  async asyncData ({ store, route }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('TAGS', id)
    return {
      lists: data || []
    }
  },
  head () {
    return {
      title: '标签 - ' + this.$store.state.user.nickname
    }
  }
}
</script>
