<template>
  <div class="m-t-10">
    <h2>登出(Signout Url)</h2>
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
      <a-list-item v-for="(item,index) in client.postLogoutRedirectUris" :key="index">
        <div>{{item.postLogoutRedirectUri}}</div>
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
      items: [],
      name: ''
    }
  },
  computed: {
    ...mapGetters(['client'])
  },
  methods: {
    plusItem() {
      this. client.postLogoutRedirectUris.push({postLogoutRedirectUri:this.name})
      this.name = ''
    },
    del(index) {
      this. client.postLogoutRedirectUris.splice(index, 1)
    }
  }
}
</script>