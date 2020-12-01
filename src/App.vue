<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import en from 'ant-design-vue/lib/locale-provider/en_US'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  },
  mounted() {
    var _this = this
    // signalR.start()
    // signalR.connection.on('ReceiveMessage', function(message) {
    //   console.log('ReceiveMessage:' + message)
    //   _this.$notification.open({
    //     message: '有新的订单',
    //     description: message
    //   })
    // })
  }
}
</script>
<style>
#app {
  height: 100%;
}
.m-t-10 {
  margin-top: 10px;
}
.center {
  text-align: center;
}
.f-r {
  float: right;
}
</style>
