<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="vertical">
        <a-row :gutter="48">
          <a-col :md="4">
            <a-form-item label="用户名">
              <a-input v-model="query.userName" />
            </a-form-item>
          </a-col>
          <a-col :md="4">
            <a-form-item label="Url地址">
              <a-input v-model="query.url" />
            </a-form-item>
          </a-col>
          <a-col :md="4">
            <a-form-item label="最小执行时间">
              <a-input-number v-model="query.minExecutionDuration" style="width:95%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :md="4">
            <a-form-item label="最大执行时间">
              <a-input-number v-model="query.maxExecutionDuration" style="width:95%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :md="4">
            <a-form-item label="请求方法">
              <a-select defaultValue style="width:95%" v-model="query.httpMethod">
                <a-select-option value>全部</a-select-option>
                <a-select-option value="GET">GET</a-select-option>
                <a-select-option value="POST">POST</a-select-option>
                <a-select-option value="DELETE">DELETE</a-select-option>
                <a-select-option value="PUT">PUT</a-select-option>
                <a-select-option value="HEAD">HEAD</a-select-option>
                <a-select-option value="CONNECT">CONNECT</a-select-option>
                <a-select-option value="OPTIONS">OPTIONS</a-select-option>
                <a-select-option value="TRACE">TRACE</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4">
            <a-form-item label="响应状态">
              <HttpStatusCode v-model="query.httpStatusCode" />
            </a-form-item>
          </a-col>
          <!-- <a-col :md="2" :sm="24" style="text-align: right;">
              <a-button type="primary" @click="search">{{$t('page.query')}}</a-button>
          </a-col>-->
        </a-row>
        <a-row :gutter="48">
          <a-col :md="7">
            <a-form-item label="Application Name">
              <a-input v-model="query.applicationName" />
            </a-form-item>
          </a-col>
          <a-col :md="7">
            <a-form-item label="Correlation Id">
              <a-input v-model="query.correlationId" />
            </a-form-item>
          </a-col>
          <a-col :md="7">
            <a-form-item label="是否含有错误">
              <a-select defaultValue style="width:95%" v-model="query.hasException">
                <a-select-option value>全部</a-select-option>
                <a-select-option value="true">是</a-select-option>
                <a-select-option value="false">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="3">
            <!-- <a-form-item label=""> -->
            <a-button
              style="margin-top:1.8rem;width:100%"
              type="primary"
              @click="search"
            >{{$t('page.query')}}</a-button>
            <!-- </a-form-item> -->
          </a-col>
        </a-row>
      </a-form>

      <s-table ref="table" size="default" row-key="id" :columns="columns" :data="loadData">
        <template slot="time" slot-scope="text">{{ GetTime(text)}}</template>
        <template slot="request" slot-scope="record">
          <a-tag color="green" v-if="record.httpStatusCode==200">{{record.httpStatusCode}}</a-tag>
          <a-tag color="#f50" v-else>{{record.httpStatusCode}}</a-tag>

          <a-tag color="green" v-if="record.httpMethod=='POST'">{{record.httpMethod}}</a-tag>
          <a-tag color="#343a40" v-else-if="record.httpMethod=='GET'">{{record.httpMethod}}</a-tag>
          <a-tag color="#f50" v-else-if="record.httpMethod=='GET'">{{record.httpMethod}}</a-tag>
          <a-tag color="blue" v-else>{{record.httpMethod}}</a-tag>
          {{record.url}}
        </template>

        <template slot="action" slot-scope="text,record">
          <a-button type="primary" icon="search" @click="showDetail(record.id)">详情</a-button>
          <!-- <router-link :to="{path:'/order/orderDetail',query:{id:record.id}}">详情</router-link> -->
        </template>
      </s-table>
    </div>
    <audit-logs-detail ref="log_detail" />
  </a-card>
</template>
<script>
import { STable } from '@/components'
import HttpStatusCode from '@/components/HttpStatusCode/HttpStatusCode'
import { from } from 'linq'
import * as audit from '@/api/administration/audit-logging'
import moment from 'moment'
import audit_logs_detail from './audit-logs-detail'

export default {
  data() {
    return {
      columns: [
        {
          title: 'Http Request',
          scopedSlots: { customRender: 'request' }
        },
        {
          title: '用户',
          dataIndex: 'userName'
        },
        {
          title: 'Ip Address',
          dataIndex: 'clientIpAddress'
        },
        {
          dataIndex: 'executionTime',
          title: '请求时间',
          scopedSlots: {
            customRender: 'time'
          }
        },
        {
          title: '耗时(毫秒)',
          dataIndex: 'executionDuration'
        },
        {
          title: '程序名称',
          dataIndex: 'applicationName'
        },
        {
          title: this.$t('table.action'),
          dataIndex: '',
          key: 'x',
          align: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      query: {
        maxResultCount: 10,
        skipCount: 0,
        url: '',
        httpMethod: '',
        httpStatusCode: '',
        userName: '',
        minExecutionDuration: '',
        maxExecutionDuration: '',
        applicationName: '',
        correlationId: '',
        hasException: ''
      },
      loadData: parameter => {
        return audit.audit_logs(Object.assign(this.query, parameter)).then(res => {
          return res
        })
      }
    }
  },
  methods: {
    GetTime(time) {
      // return moment(time, 'YYYY-MM-DD HH:mm');

      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    search() {
      this.$refs.table.refresh()
    },
    del(record, index) {
      delOrder(record.id).then(result => {
        this.$message.success(this.$t('table.delete') + this.$t('page.successful'))
        //this.data.splice(index, 1)
        this.$refs.table.refresh()
      })
    },
    showDetail(id) {
      this.$refs.log_detail.show(id)
    }
  },
  mounted() {},
  watch: {},
  components: {
    HttpStatusCode,
    STable,
    'audit-logs-detail': audit_logs_detail
  }
}
</script>
<style scoped>
</style>

