<template>
  <a-row>
    <a-col :span="4">企业：</a-col>
    <a-col :span="16">{{name}}</a-col>
    <a-col :span="4">
      <a-button type="primary" @click="show">切换</a-button>
    </a-col>
    <a-modal :visible="visible" title="切换租户" @cancel="hide" @ok="handlOk">
      <a-form>
        <a-form-item label="名称:">
          <a-input placeholder="输入租户名称或代码" v-model="name"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'tenantChange',
  data() {
    return {
      visible: false,
      name: ''
    }
  },
  methods: {
    ...mapActions(['GetTenantByName']),
    show() {
      this.name = ''
      this.visible = true
    },
    handlOk() {
      this.GetTenantByName(this.name)
        .then(res => {
          this.visible = false
        })
        .catch(err => {
          this.$message.error('租户无效')
        })
    },
    hide() {
      this.visible = false
    }
  }
}
</script>
<style scoped>
</style>