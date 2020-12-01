<template>
  <div class="m-t-10">
    <h2>回调地址(Callback Url)</h2>
    <div>
      <a-form layout="vertical">
        <a-form-item label="Uri">
          <a-input v-model="name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            class="f-r"
            style="   margin-top: -10px;"
            icon="plus"
            @click="plusItem"
          >添加</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-list style="margin-top:15px" bordered>
      <a-list-item v-for="(item,index) in client.redirectUris" :key="index">
        <div>{{item.redirectUri}}</div>
        <a slot="actions">
          <a-button type="primary" @click="del(index)" icon="delete"></a-button>
        </a>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      // items: client.redirectUris,
      name: ''
    }
  },
  computed: {
    ...mapGetters(['client'])
  },
  methods: {
    plusItem() {
      this.client.redirectUris.push({ redirectUri: this.name })
      this.name = ''
    },
    del(index) {
      this.client.redirectUris.splice(index, 1)
    }
  }
}
</script>