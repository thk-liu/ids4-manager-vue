tenants<template>
  <a-card>
    <a-row :gutter="24">
      <a-col :span="7">
        <span style="margin-right:5%">关键字:</span>
        <a-input style="width:50%" v-model="query.filter" placeholder="请输入搜索关键字" />
      </a-col>
      <a-col :span="12">
        <span style="margin-right:5%">状态:</span>
        <a-select defaultValue="启用" placeholder="状态">
          <a-select-option value="启用">启用</a-select-option>
          <a-select-option value="停用">停用</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="5" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit" @click="()=>this.$refs.table.refresh()">查询</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" html-type="submit" @click="showEdit()">新增</a-button>
      </a-col>
    </a-row>

    <s-table ref="table" row-key="id" :columns="columns" :data="loadData" style="margin-top:12px">
      <span slot="state" slot-scope="state,record">
        <a-switch
          checkedChildren="启用"
          unCheckedChildren="停用"
          @change="stateChange(record)"
          :defaultChecked="state"
        />
      </span>
      <template slot="action" slot-scope="text,record,index">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" v-if="!record.isStatic" @click="showEdit(record.id)">
              <a-icon type="edit" />编辑
            </a-menu-item>
            <!-- <a-menu-item key="2" @click="$refs.claims.show(record.id)">
              <a-icon type="hdd" />Claims
            </a-menu-item>-->
            <a-menu-item key="2" @click="showConnectionStrings(record.id)">Connection Strings</a-menu-item>
            <a-menu-item key="3" @click="showFeature(record.id)">功能</a-menu-item>
            <a-menu-item key="4" v-if="!record.isStatic">
              <a-popconfirm title="该操作无法恢复,确认删除吗?" @confirm="del(record.id,index)">
                <a-icon type="delete" />
                {{$t('table.delete')}}
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            <a-icon type="setting" />操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <!--   <a-button type="default" size="small" @click="showDrawer(record)">{{$t('table.edit')}}</a-button>
        <a-divider type="vertical" />
        <a-button type="default" size="small">删除</a-button>-->
      </template>
    </s-table>
    <connectionString ref="connectionString" />
    <edit ref="edit" @close="refresh" />
  </a-card>
</template>
<style lang="less" scoped>
</style>
<script>
/* eslint-disable */

const columns = [
  {
    title: '租户名称',
    dataIndex: 'name'
  },
  {
    title: '版本',
    dataIndex: 'editionName'
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'validity'
  // },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, align: 'right' }
]

import * as tenantApi from '@/api/administration/tenancy'
import { STable } from '@/components'
import connectionString from './tenant/connection-string'
import edit from './tenant/edit'
import { get as getFeatures } from '@/api/administration/feature'

import moment from 'moment'

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      columns,
      query: {
        filter: '',
        maxResultCount: 10,
        skipCount: 0
      },
      loadData: parameter => {
        return tenantApi.all(Object.assign(this.query, parameter)).then(res => {
          return res
        })
      },
      model: {}
    }
  },
  components: {
    STable,
    connectionString,
    edit
  },
  methods: {
    moment,
    showEdit(id) {
      this.$refs.edit.show(id)
    },
    handleNewTenant(){

    },
    showFeature(id) {
      getFeatures(id, 'T')
    },
    refresh() {
      this.$refs.table.refresh()
    },
    showConnectionStrings(id) {
      this.$refs.connectionString.show(id)
    },
    del(id, index) {}
  }
  // mounted() {
  //   this.api.tenant.getList().then(data => {
  //     console.log(data)
  //   })
  // }
}
</script>



