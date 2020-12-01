<template>
  <a-modal
    :visible="visible"
    title="Connection Strings"
    @ok="handleOk"
    @cancel="handelCancel"
    destroyOnClose
    :maskClosable="false"
  >
    <a-form>
      <a-form-item>
        <a-checkbox :checked="useDefaultDB" @change="defaultDbChange">使用共享数据库</a-checkbox>
      </a-form-item>
      <a-form-item label="默认数据库连接字符串" v-if="!useDefaultDB">
        <a-input v-model="connectionStrings"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { defaultConnectionString, updateConnectionString, deleteConnectionString } from '@/api/administration/tenancy'
export default {
  data() {
    return {
      visible: false,
      useDefaultDB: true,
      connectionStrings: '',
      tenantId: undefined
    }
  },
  computed: {},
  methods: {
    show(id) {
      this.visible = true
      this.tenantId = id
      defaultConnectionString(id).then(res => {
        if (res.status&&res.status==204) {
          
        }else{
          this.connectionStrings = res
          this.useDefaultDB = false
        }
      })
    },
    defaultDbChange(e) {
      this.useDefaultDB = !this.useDefaultDB
    },
    handelCancel() {
      this.visible = false
    },
    handleOk() {
      var scope = this
      console.log(this)

      scope.$confirm({
        title: '敏感操作',
        content: '该操作会影响您的数据正常使用,确认更改字符串链接设置吗？',
        onOk: function() {
          scope.visible = false
          if (scope.useDefaultDB) {
            deleteConnectionString(scope.tenantId).then(res => {
              scope.$message.success('该租户已成功使用共享数据库')
            })
          } else {
            updateConnectionString(scope.tenantId, scope.connectionStrings).then(res => {
              scope.$message.success('该租户已成功使用独享数据库')
            })
          }
        }
      })
    }
  }
}
</script>