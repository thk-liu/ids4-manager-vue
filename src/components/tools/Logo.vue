<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <!-- <LogoSvg alt="logo" /> -->
      <img :src="logo" class="logoIcon" alt="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'
import { mapGetters } from 'vuex'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  computed: {
    ...mapGetters(['logo'])
  },
  props: {
    title: {
      type: String,
      // default: 'Ant Design Pro',
      default: 'B2B',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style scoped>
.logo {
  
}

</style>
