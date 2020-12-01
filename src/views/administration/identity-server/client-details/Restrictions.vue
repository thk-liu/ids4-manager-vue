<template>
  <div class="m-t-10">
    <h2>限制(Restrictions)</h2>
    <div>
      <a-form layout="vertical">
        <a-form-item label="名称">
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
      <a-list-item v-for="(item,index) in client.identityProviderRestrictions" :key="index">
        <div>{{item.provider}}</div>
        <a slot="actions">
          <a-button type="primary" @click="del(index)" icon="delete"></a-button>
        </a>
      </a-list-item>
    </a-list>
    <div class="m-t-10">
      <a-checkbox v-model="client.enableLocalLogin">启用本地登录</a-checkbox>
    </div>
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
      this.client.identityProviderRestrictions.push({provider:this.name})
    },
    del(index) {
      this.client.identityProviderRestrictions.splice(index, 1)
    }
  }
}
</script>