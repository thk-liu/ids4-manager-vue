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
      <template slot="role" slot-scope="record">
        {{record.name}}
        <a-tag color="pink" v-if="record.isDefault">默认</a-tag>
        <a-tag color="#f50" v-if="record.isStatic">不允许修改</a-tag>
        <a-tag color="orange" v-if="record.isPublic">公共</a-tag>
      </template>
      <template slot="action" slot-scope="text,record">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" v-if="!record.isStatic">
              <a-icon type="edit" />编辑
            </a-menu-item>
            <a-menu-item key="2" @click="$refs.claims.show(record.id)">
              <a-icon type="hdd" />Claims
            </a-menu-item>
            <a-menu-item key="3" @click="permissionsShow(record.id)">
              <a-icon type="lock" />权限
            </a-menu-item>
            <a-menu-item key="4" v-if="!record.isStatic" @click="del(record.id)">
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
    <permissions ref="permissions" providerName="U" />
         <claims ref="claims"/>

  </a-card>
</template>
<style lang="less" scoped>
</style>
<script>
/* eslint-disable */

const columns = [
  {
    title: '用户名',
    dataIndex: 'name'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '联系电话',
    dataIndex: 'phoneNumber'
  },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, align: 'right' }
]

import { STable } from '@/components'
import * as identity from '@/api/administration/identity'
import permissions from '../components/permissions'
import claims from '../components/claims'

export default {
  data() {
    return {
      columns,
      permissionsProviderKey: '',
      query: {
        filter: '',
        maxResultCount: 10,
        skipCount: 0
      },
      loadData: parameter => {
        return identity.users(Object.assign(this.query, parameter))
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
    permissions,
    claims
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    permissionsShow(key) {
      this.$refs.permissions.show(key)
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



