tenants<template>
  <a-card>
    <a-row :gutter="24">
      <a-col :span="7">
        <span style="margin-right:5%">关键字:</span>
        <a-input style="width:50%" v-model="query.filter" placeholder="请输入搜索关键字" />
      </a-col>
      <a-col :span="17" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit" @click="()=>this.$refs.table.refresh()">查询</a-button>
        <!-- <a-divider type="vertical" />
        <a-button type="primary" html-type="submit">新增</a-button>-->
      </a-col>
    </a-row>
    <s-table
      ref="table"
      :rowSelection="rowSelection"
      row-key="id"
      :columns="columns"
      :data="loadData"
      style="margin-top:12px"
    >
      <template slot="action" slot-scope="text,record">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" v-if="!record.isStatic">
              <a-icon type="edit" />编辑
            </a-menu-item>

            <a-menu-item key="4" @click="del(record.id)">
              <a-icon type="delete" />
              {{$t('table.delete')}}
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            <a-icon type="setting" />操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </template>
      <template slot="valueTypeAsString" slot-scope="text">
        <a-tag>{{valueTypeAsString(text)}}</a-tag>
      </template>
      <template slot="bool" slot-scope="text">
        <a-icon type="check-circle" v-if="text" theme="twoTone" twoToneColor="#52c41a" />
        <a-icon type="close-circle" v-else theme="twoTone" twoToneColor="#eb2f96" />
      </template>
      <template slot="footer" slot-scope="currentPageData">
        <a-button type="default">批量删除</a-button>
      </template>
    </s-table>
  </a-card>
</template>
<style lang="less" scoped>
</style>
<script>
/* eslint-disable */

const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '数据类型',
    dataIndex: 'valueType',
    scopedSlots: { customRender: 'valueTypeAsString' }
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '正则表达式',
    dataIndex: 'regex'
  },
  {
    title: '是否必须',
    dataIndex: 'required',
    align: 'center',
    scopedSlots: { customRender: 'bool' }
  },
  {
    title: '不允许修改',
    dataIndex: 'isStatic',
    align: 'center',
    scopedSlots: { customRender: 'bool' }
  },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, align: 'right' }
]

import { STable } from '@/components'
import * as identity from '@/api/administration/identity'

export default {
  data() {
    return {
      columns,
      query: {
        filter: '',
        maxResultCount: 10,
        skipCount: 0
      },
      loadData: parameter => {
        return identity.claim_types(Object.assign(this.query, parameter))
      },
      model: {},
      selectedRowKeys: [] // Check here to configure the default column,
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        onSelection: this.onSelection
      }
    }
  },
  components: {
    STable
  },
  methods: {
    valueTypeAsString(type) {
      if (type == 0) {
        return 'String'
      } else if (type == 1) {
        return 'Int'
      } else if (type == 2) {
        return 'Boolean'
      } else if (type == 3) {
        return 'DateTime'
      } else {
        return '未知'
      }
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    stateChange(record) {
      console.log(record)
    },
    del(id, index) {
      this.$confirm({
        title: '敏感操作',
        content: '该操作无法恢复,确认删除吗?',
        onOk() {
          identity.del_user(id).then(data => {
            this.$message.success('用户删除成功')
            this.$refs.table.refresh()
          })
        }
      })
    }
  }
}
</script>



