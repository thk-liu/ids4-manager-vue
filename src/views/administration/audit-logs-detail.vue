<template>
  <a-modal :visible="visible" title="日志详情" :maskClosable="true" keyboard :width="700" :destroyOnClose="true" @cancel="handleOk">
    <a-tabs v-if="detail">
      <a-tab-pane key="1" tab="整体信息">
        <a-list size="small">
          <a-list-item>
            <h4>Http Status Code:</h4>
            {{detail.httpStatusCode}}
          </a-list-item>
          <a-list-item>
            <h4>Http Method:</h4>
            {{detail.httpMethod}}
          </a-list-item>
          <a-list-item>
            <h4>Url:</h4>
            {{detail.url}}
          </a-list-item>
          <a-list-item>
            <h4>客户IP:</h4>
            {{detail.clientIpAddress}}
          </a-list-item>
          <a-list-item>
            <h4>Client Name:</h4>
            {{detail.clientName}}
          </a-list-item>
          <a-list-item>
            <h4>错误信息:</h4>
            {{detail.exceptions}}
          </a-list-item>
          <a-list-item>
            <h4>用户:</h4>
            {{detail.userName}}
          </a-list-item>
          <a-list-item>
            <h4>请求时间:</h4>
            {{detail.executionTime}}
          </a-list-item>
          <a-list-item>
            <h4>耗时(毫秒):</h4>
            {{detail.executionDuration}}
          </a-list-item>
          <a-list-item>
            <h4>浏览器信息:</h4>
            {{detail.browserInfo}}
          </a-list-item>
          <a-list-item>
            <h4>Correlation Id:</h4>
            {{detail.correlationId}}
          </a-list-item>
          <a-list-item>
            <h4>Comments:</h4>
            {{detail.comments}}
          </a-list-item>
          <a-list-item>
            <h4>扩展信息:</h4>
            {{detail.extraProperties}}
          </a-list-item>
        </a-list>
      </a-tab-pane>
      <a-tab-pane key="2" tab="请求信息">
        <a-collapse defaultActiveKey="0">
          <a-collapse-panel
            :key="index+1"
            v-for="(action,index) in detail.actions"
            :header="action.serviceName"
          >
            <a-list>
              <a-list-item>耗时(毫秒):{{action.executionDuration}}</a-list-item>
              <a-list-item>参数:{{action.parameters}}</a-list-item>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>

      <a-tab-pane key="3" :tab="`更改(${detail.entityChanges.length})`">

      </a-tab-pane>
    </a-tabs>
    <template slot="footer">
      <a-button key="submit" type="primary" @click="handleOk">关闭</a-button>
    </template>
  </a-modal>
</template>
<script>
import { get } from '@/api/administration/audit-logging'
import { from } from 'linq'
export default {
  name: 'audit-logs-detail',
  data() {
    return {
      visible: false,
      detail: undefined
    }
  },
  methods: {
    show(id) {
      this.visible = true
      get(id).then(detail => {
        this.detail = detail
      })
    },
    handleOk() {
      this.visible = false
    }
  }
}
</script>