tenants<template>
  <a-card>
    <a-row :gutter="24">
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit" @click="()=>this.$refs.table.refresh()">查询</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" html-type="submit" @click="roleShow">新增</a-button>
      </a-col>
    </a-row>
    <!-- <s-table
      ref="table"
      :rowSelection="rowSelection"
      row-key="id"
      :columns="columns"
      :data="loadData"
      style="margin-top:12px"
    >-->
    <s-table ref="table" row-key="id" :columns="columns" :data="loadData" style="margin-top:12px">
        <template slot="role" slot-scope="record">
            {{record.name}}  <a-tag color="pink" v-if="record.isDefault">默认</a-tag> <a-tag color="#f50" v-if="record.isStatic">不允许修改</a-tag> <a-tag color="orange" v-if="record.isPublic">公开</a-tag>
        </template>
      <template slot="action" slot-scope="text,record">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" v-if="!record.isStatic" @click="roleShow(record)" >
              <a-icon type="edit"  />编辑
            </a-menu-item>
            <!-- <a-menu-item key="2" @click="$refs.claims.show(record.id)">
              <a-icon type="hdd" />Claims
            </a-menu-item> -->
            <a-menu-item key="3" @click="permissionsShow(record.name)">
              <a-icon type="lock" />权限
            </a-menu-item>
            <a-menu-item key="4" v-if="!record.isStatic">
              <a-popconfirm title="该操作无法恢复,确认删除吗?" @confirm="delRole" >
                <a-icon type="delete" /> {{$t('table.delete')}}
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            <a-icon type="setting" />操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </template>
      <!-- <template slot="footer" slot-scope="currentPageData">
        <a-button type="default">批量删除</a-button>
      </template>-->
    </s-table>
     <claims ref="claims" mode="role" />
     <permissions ref="permissions" providerName="R" />
     <roleEdit ref="role" />
  </a-card>
</template>
<style lang="less" scoped>
</style>
<script>
/* eslint-disable */

const columns = [
  {
    title: '角色名称',
    scopedSlots: { customRender: 'role' }
  },

  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, align: 'right' }
]

import { STable } from '@/components'
import * as role from '@/api/corp/role'
import claims from '../components/claims'
import permissions from '../components/permissions'
import roleEdit from '../components/role'

export default {
  data() {
    return {
      permissionsProviderKey:"",
      columns,
      query: {
        key: '',
        State: '',
        maxResultCount: 10,
        skipCount: 0
      },
      loadData: parameter => {
        return role.getRoles(parameter)
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
    claims,
    permissions,
    roleEdit
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    permissionsShow(key){
        this.$refs.permissions.show(key);
    },
    roleShow(role){
      this.$refs.role.show(role);
    },
    claimsShow(id){
      this.$refs.claims.resetFields();
    },
    stateChange(record) {
      console.log(record)
    },
    delRole() {
      var id = this.mdl.id
      corpRole.delRole(id).then(data => {
        this.$message.success('角色删除成功')
        for (let index = 0; index < this.roles.length; index++) {
          const element = this.roles[index]
          if (element.id == id) {
            this.roles.splice(index, 1)
            break
          }
        }
      })
    }
  }
}
</script>



