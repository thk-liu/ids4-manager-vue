<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item v-for="(msg,index) in messages" :key="index">
                <!-- <router-link :to="routerTo(msg.notificationName,msg.refId)" target="_blank" @click="read"> -->
                <a-list-item-meta :title="msg.message" :description="timeAgo(msg.creationTime)" @click="openLink(msg.notificationName,msg.refId,msg.id)">
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
                <!-- </router-link> -->
              </a-list-item>
              <!-- <a-list-item>
                <a-list-item-meta title="客户：耨某某提交的新订单" description="5分前">
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="有新的订单" description="客户：耨某某提交的新订单">
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"
                  />
                </a-list-item-meta>
              </a-list-item>-->
            </a-list>
          </a-tab-pane>
          <!-- <a-tab-pane tab="消息" key="2">
            123
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
            123
          </a-tab-pane>-->
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef">
      <a-badge :count="count">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { GetCounts, GetLists,SetReader } from '@/api/tenantNotification'
import moment from 'moment'

export default {
  name: 'HeaderNotice',
  data() {
    return {
      loadding: false,
      visible: false,
      count: 0,
      messages: []
    }
  },
  methods: {
    routerTo(name,refId){
        return {name: 'orderDetail',query: {id: refId }};
    },
    openLink(name,refId,id){
      let link =undefined;
      if(name=='order'){
        link=this.$router.resolve({name: 'orderDetail',query: {id: refId }});
      }
      window.open(link.href,'_blank')
      SetReader(id).then(res=>{})
    },
    timeAgo(time) {
      var a = moment(time, 'YYYY-MM-DD HH:mm')
      var b = moment().format('YYYY-MM-DD HH:mm')
      return a.from(b)
    },
    fetchNotice() {
      if (!this.visible) {
        if (this.messages && this.messages.length > 0) {
          this.loadding = false
          return
        }
        this.loadding = true
        GetLists({state:0}).then(data => {
          this.messages = data.items
          this.loadding = false
        })
        //   this.loadding = true
        //   setTimeout(() => {
        //     this.loadding = false
        //   }, 2000)
        // } else {
        //   this.loadding = false
      }
      this.visible = !this.visible
    }
  },
  mounted() {
    GetCounts({state:0}).then(data => {
      this.count = data
    })
  }
}
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
</style>
