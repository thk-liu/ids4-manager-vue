<template>
  <div class="m-t-10">
    <h2>属性(Properties)</h2>
    <a-card style="background-color: #fafafa">
      <a-form layout="vertical">
        <a-row :gutter="40">
          <a-col :span="12">
            <a-form-item label="Key">
              <a-input v-model="item.key"></a-input>
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
    <a-table
      class="m-t-10"
      :columns="secretsColumns"
      :dataSource="client.properties"
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
    dataIndex: 'key'
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      secretsColumns,
      items: [],
      item: {
        Key: '',
        value: null
      }
    }
  },
  computed: {
    ...mapGetters(['client'])
  },
  methods: {
    pushItem() {
      this.items.push({ ...this.item })
      this.item = {
        Key: '',
        value: null
      }
    },
    del(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>