tenants<template>
  <a-card>
    <a-row :gutter="24">
      <a-col :span="7">
        <span style="margin-right:5%">关键字:</span>
        <a-input style="width:50%" v-model="query.filter" placeholder="请输入搜索关键字" />
      </a-col>
      <a-col :span="17" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit" @click="()=>this.$refs.table.refresh()">查询</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" html-type="submit" @click="handleShow()">新增</a-button>
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
            <a-menu-item key="1" v-if="!record.isStatic" @click="handleShow(record.id)">
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
      <template slot="footer" slot-scope="currentPageData">
        <a-button type="default">批量删除</a-button>
      </template>
    </s-table>
    <identity-resources-edit ref="edit" />
  </a-card>
</template>
<style lang="less" scoped>
</style>
<script>
/* eslint-disable */

const columns = [
  {
    title: 'Id',
    dataIndex: 'name'
  },
  {
    title: '名称',
    dataIndex: 'displayName'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, align: 'right' }
]

import { STable } from '@/components'
import * as resources from '@/api/administration/identity-resources'
import edit from './identity-resources-edit'

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
        return resources.getAll(Object.assign(this.query, parameter))
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
    STable,
    'identity-resources-edit': edit
  },
  methods: {
    handleShow(id) {
      this.$refs.edit.show(id)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    stateChange(record) {
      console.log(record)
    },
    del(id, index) {
      var scope = this
      this.$confirm({
        title: '敏感操作',
        content: '该操作无法恢复,确认删除吗?',
        onOk() {
          resources.del(id).then(data => {
            scope.$message.success('删除成功')
            scope.$refs.table.refresh();
          })
        }
      })
    }
  }
}
</script>



