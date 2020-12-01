import Vue from 'vue'
import * as signalR from '@microsoft/signalr'
import server from '@/utils/server'
import { axios } from '@/utils/request'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import notification from 'ant-design-vue/es/notification'
import store from '@/store'

const SignalR = {
    connection: null,
    start() {
        const token = store.getters.token
            //.net core 版本中默认不会自动重连，需手动调用 withAutomaticReconnect
        SignalR.connection = new signalR.HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(server.BaseUrlApi + '/signalr-hubs/message', { accessTokenFactory: () => token })
            .build()
        SignalR.connection.start().then(res => {
            // SignalR.connection
            //     .invoke("SendMessage", "admin", '测试')
            //     .then(function() {
            //         console.log("================");
            //     })
            //     .catch(function(err) {
            //         return console.error(err.toString());
            //     });
            SignalR.connection.on('NoticeOrderMessage', (message) => {
                console.log(message);
                notification.open({
                    message: '有新的订单',
                    description: message
                })
            })
        }).catch(err => alert(err.message))



    },
    sendMsg() {


    },
    // on() {
    //     //实现监听服务器调用
    //     // SignalR.connection.on('ReceiveMessage', function(message) {
    //     //     console.log('ReceiveMessage:' + message)
    //     // })
    // },
    send() {
        let message = '测试signalR'
        axios.post('/api/chat/send-message', {
            targetUserName: 'targetUserName',
            message: message
        })
    }
}

export default SignalR;