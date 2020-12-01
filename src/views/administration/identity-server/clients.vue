tenants<template>
  <a-card>
    <a-row :gutter="24">
      <a-col :span="7">
        <span style="margin-right:5%">关键字:</span>
        <a-input style="width:50%" v-model="query.filter" placeholder="请输入搜索关键字" />
      </a-col>
      <a-col :span="12"></a-col>
      <a-col :span="5" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit" @click="()=>this.$refs.table.refresh()">查询</a-button>
        <a-divider type="vertical" />
        <!-- <router-link :to="{name:'client-details'}"> -->
        <a-button type="primary" html-type="submit" @click="showDetail()">新增</a-button>
        <!-- </router-link> -->
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
      <template slot="bool" slot-scope="text">
        <a-icon type="check-circle" v-if="text" theme="twoTone" twoToneColor="#52c41a" />
        <a-icon type="close-circle" v-else theme="twoTone" twoToneColor="#eb2f96" />
      </template>
      <template slot="action" slot-scope="text,record">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="showDetail(record.id)">
              <a-icon type="edit" />编辑
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="hdd" />管理权限
            </a-menu-item>
            <a-menu-item key="3" @click="del(record.id)">
              <a-icon type="delete" />删除
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
    <client-detail ref="detail" />
  </a-card>
</template>
<style lang="less" scoped>
</style>
<script>
/* eslint-disable */

const columns = [
  {
    title: 'Client Id',
    dataIndex: 'clientId'
  },
  {
    title: '应用程序名称',
    dataIndex: 'clientName'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '是否启用',
    dataIndex: 'enabled',
    align:"center",
    scopedSlots: { customRender: 'bool' }
  },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, align: 'right' }
]

import { STable } from '@/components'
import * as identity from '@/api/administration/identity'
import client_detail from './client-detail'
import { createNamespacedHelpers } from 'vuex'

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
        return identity.clients(Object.assign(parameter, this.query))
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
  mounted() {
    // this.$proxyScript.identity.httpApi.users.getClaims('1231231').then(r => console.log('r', r))
  },
  components: {
    STable,
    'client-detail': client_detail
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    stateChange(record) {
      console.log(record)
    },
    showDetail(id) {
      this.$refs.detail.show(id)
    },
    del(id) {
      var scope = this
      this.$confirm({
        title: '敏感操作',
        content: '该操作不可恢复，确认删除吗？',
        onOk() {
          identity.delete_client(id).then(res => {
            scope.$message.success('删除成功!')
            scope.$refs.table.refresh()
          })
        }
      })
    }
  }
}
</script>



