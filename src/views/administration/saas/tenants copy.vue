tenants<template>
  <a-card>
    <a-row :gutter="24">
      <a-col :span="7">
        <span style="margin-right:5%">关键字:</span>
        <a-input style="width:50%" v-model="query.key" placeholder="请输入搜索关键字" />
      </a-col>
      <a-col :span="12">
        <span style="margin-right:5%">状态:</span>
        <a-select defaultValue="启用" placeholder="状态">
          <a-select-option value="启用">启用</a-select-option>
          <a-select-option value="停用">停用</a-select-option>
          <a-select-option value="过期">过期</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="5" :style="{ textAlign: 'right' }">
        <a-button type="primary" html-type="submit" @click="()=>this.$refs.table.refresh()">查询</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" html-type="submit" @click="showDrawer">新增</a-button>
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
      <span slot="state" slot-scope="state,record">
        <a-switch
          checkedChildren="启用"
          unCheckedChildren="停用"
          @change="stateChange(record)"
          :defaultChecked="state"
        />
      </span>
      <template slot="action" slot-scope="text,record">
        <a-button type="default" size="small" @click="showDrawer(record)">{{$t('table.edit')}}</a-button>
        <a-divider type="vertical" />
        <a-button type="default" size="small">删除</a-button>
      </template>
      <template slot="footer" slot-scope="currentPageData">
        <a-button type="default">批量删除</a-button>
      </template>
    </s-table>

    <a-drawer
      :title="model.id?'修改租户信息':'新增租户信息'"
      :width="720"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="租户名称">
              <a-input placeholder="请输入租户名称" v-model="model.name" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="租户编码">
              <a-input v-model="model.tenantName" placeholder="请输入租户编码" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="12">
            <a-form-item label="">
              <a-select
                v-decorator="['owner', {
                  rules: [{ required: true, message: 'Please select an owner' }]
                }]"
                placeholder="Please a-s an owner"
              >
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>-->
        </a-row>
        <!-- <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="租户网址">
              <a-input
                v-decorator="['url', {
                  rules: [{ required: true, message: '请输入租户网址' }]
                }]"
                style="width: 100%"
                addonBefore="http://"
                addonAfter=".com"
                placeholder="请输入租户网址"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="租户解析方式">
              <a-select placeholder="请选择租户解析方式">
                <a-select-option value="public">通用-编码</a-select-option>
                <a-select-option value="private">自定义</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>-->
        <a-row :gutter="16">
          <!-- <a-col :span="12">
            <a-form-item label="Approver">
              <a-select placeholder="Please choose the approver">
                <a-select-option value="jack">Jack Ma</a-select-option>
                <a-select-option value="tom">Tom Liu</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>-->
          <a-col :span="12">
            <a-form-item label="有效期">
              <a-date-picker style="width: 100%" :value="moment('2020-1-1', 'YYYY-MM-DD')" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="描述">
              <a-textarea :rows="4" v-model="model.serverRemark" placeholder="输入描述" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <a-button @click="onSubmit" type="primary">提交</a-button>
      </div>
    </a-drawer>
  </a-card>
</template>
<style lang="less" scoped>
</style>
<script>
/* eslint-disable */

const columns = [
  {
    title: '租户编码',
    dataIndex: 'tenantName'
  },
  {
    title: '租户名称',
    dataIndex: 'name'
  },
  {
    title: '版本',
    dataIndex: 'editions'
  },
  {
    title: '描述',
    dataIndex: 'serverRemark'
  },
  {
    title: '有效期',
    dataIndex: 'validity'
  },
  {
    title: '状态',
    dataIndex: 'activity',
    scopedSlots: { customRender: 'state' }
  },
  { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' }, align: 'right' }
]

import * as tenantApi from '@/api/administration/tenancy'
import { STable } from '@/components'
import moment from 'moment'

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      columns,
      query: {
        key: '',
        State: '',
        maxResultCount: 10,
        skipCount: 0
        // startTime: '',
        // endTime: ''
        // orderSource: 'Lease'
      },
      loadData: parameter => {
        return tenantApi.all(Object.assign(this.query, parameter)).then(res => {
          return res
        })
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
        onSelection: this.onSelection,
        model: {
          tenantName: undefined,
          name: undefined,
          term_Validity: '2020-1-1'
        }
      }
    }
  },
  components: {
    STable
  },
  methods: {
    moment,
    showDrawer(item) {
      this.model = { ...item }
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    onSubmit() {
      if (this.model.id) {
        tenantApi.update(this.model.id, this.model).then(data => {
          this.$message.success('修改成功')
          this.$refs.table.refresh()
          this.onClose()
        })
      } else {
        tenantApi.create(this.model).then(data => {
          this.$message.success('添加成功')
          this.$refs.table.refresh()
          this.onClose()
        })
      }
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    stateChange(record) {
      console.log(record)
    }
  }
  // mounted() {
  //   this.api.tenant.getList().then(data => {
  //     console.log(data)
  //   })
  // }
}
</script>



