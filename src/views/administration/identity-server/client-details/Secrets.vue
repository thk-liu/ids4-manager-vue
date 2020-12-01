<template>
  <div class="m-t-10">
    <a-card style="background-color: #fafafa">
      <a-form layout="vertical">
        <a-row :gutter="40">
          <a-col :span="12">
            <a-form-item label="Type">
              <a-select defaultValue="SharedSecret" v-model="item.type">
                <a-select-option value="SharedSecret">Shared Secret</a-select-option>
                <a-select-option value="X509Thumbprint">X509 Thumbprint</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Description">
              <a-input v-model="item.description"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Value">
              <a-input v-model="item.value"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Expiration">
              <a-date-picker style="width:100%" @change="datePickChange" format="YYYY-MM-DD"></a-date-picker>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-button type="primary" icon="plus" class="f-r" @click="pushItem">添加</a-button>
    </a-card>
    <a-table
      class="m-t-10"
      :columns="secretsColumns"
      :dataSource="clientSecrets"
      :pagination="false"
    >
      <template slot="action" slot-scope="text,record,index">
        <a-button type="primary" icon="delete" @click="del(index)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
const secretsColumns = [
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '值',
    dataIndex: 'value'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '失效日期',
    dataIndex: 'expiration'
  },
  {
    title: '',
    align: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
import { mapGetters, mapActions } from 'vuex'
import { SharedSecret, X509Thumbprint } from '@/api/administration/identity'
export default {
  data() {
    return {
      secretsColumns,
      clientSecrets: this.value,
      item: {
        clientId: null,
        type: 'SharedSecret',
        value: null,
        description: null,
        expiration: null
      }
    }
  },
  props: {
    value: { type: Array, required: true }
  },
  // computed: {
  //   ...mapGetters(['client'])
  // },
  methods: {
    datePickChange(moment, time) {
      console.log(moment, time)
      this.item.expiration = time
    },

    pushItem() {
      var item = { ...this.item }
      var scope = this
      var resOk = function(res) {
        console.log('加密后的值:' + res)
        item.value = res
        scope.clientSecrets.push(item)
        scope.item = {
          clientId: null,
          type: 'SharedSecret',
          value: null,
          description: null,
          expiration: null
        }
        scope.$emit('input', scope.clientSecrets)
      }

      if (item.type == 'SharedSecret') {
        SharedSecret(item.value).then(res => resOk(res))
      } else if (item.type == 'X509Thumbprint') {
        X509Thumbprint(item.value).then(res => resOk(res))
      } else {
        this.$message.error('无效的加密信息')
        return
      }
    },
    del(index) {
      this.clientSecrets.splice(index, 1)
      this.$emit('input', this.clientSecrets)
    }
  }
}
</script>