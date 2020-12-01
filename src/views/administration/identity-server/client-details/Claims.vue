<template>
  <div class="m-t-10">
    <h2>Claims</h2>
    <a-card style="background-color: #fafafa">
      <a-form layout="vertical">
        <a-row :gutter="40">
          <a-col :span="12">
            <a-form-item label="Type">
              <a-input v-model="item.type"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Value">
              <a-input v-model="item.value"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-button type="primary" icon="plus" class="f-r" @click="pushItem">添加</a-button>
    </a-card>
    <a-table class="m-t-10" :columns="secretsColumns" :dataSource="client.claims" :pagination="false">
      <template slot="action" slot-scope="text,record,index">
        <a-button type="primary" icon="delete" @click="del(index)">删除</a-button>
      </template>
    </a-table>
    <div class="m-t-10">
      <a-checkbox>总是发送客户端claims</a-checkbox>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

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
    title: '',
    align: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data() {
    return {
      secretsColumns,
      items: [],
      item: {
        type: '',
        value: null
      }
    }
  },
  computed: {
    ...mapGetters(['client'])
  },
  methods: {
    pushItem() {
      this.client.claims.push({ ...this.item })
      this.item = {
        type: '',
        value: null
      }
    },
    del(index) {
      this.client.claims.splice(index, 1)
    }
  }
}
</script>