<template>
  <div class="m-t-10">
    <h2>GrantTypes</h2>
    <div>
      <a-form layout="vertical">
        <a-form-item label="Grant Type">
          <a-select defaultValue="implicit" v-model="type">
            <a-select-option
              v-for="(item,index) in GrantTypes"
              :key="index"
              :value="item.value"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="f-r" style="    margin-top: -10px;" icon="plus" @click="plusItem">添加</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-list style="margin-top:15px" bordered>
      <a-list-item v-for="(item,index) in client.allowedGrantTypes" :key="index">
        <div>{{item.grantType}}</div>
        <a slot="actions">
          <a-button type="primary" @click="del(index)" icon="delete"></a-button>
        </a>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
const GrantTypes = [
  { name: 'implicit', value: 'implicit' },
  { name: 'authorization_code', value: 'authorization_code' },
  { name: 'hybrid', value: 'hybrid' },
  { name: 'client_credentials', value: 'client_credentials' },
  { name: 'password', value: 'password' },
  { name: 'Custom', value: 'Custom' }
]
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      GrantTypes,
      items: [],
      type: "implicit"
    }
  },
    computed: {
    ...mapGetters(['client'])
  },
  methods: {
    plusItem() {
      this.client.allowedGrantTypes.push({clientId:this.client.id,grantType:this.type})
    },
    del(index) {
      this.client.allowedGrantTypes.splice(index, 1)
    }
  }
}
</script>