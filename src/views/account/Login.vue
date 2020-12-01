<template>
  <div class="login-layout">
    <div class="login-modal">
      <div style="display: inline-block; width: 50%;float:left">
        <div class="login-swiper-container"></div>
      </div>
      <div style="display:inline-block ; width: 50%;float:left">
        <div class="login-form">
          <div class="ivu-row">
            <div class="login-title ivu-col-offset-6">登录</div>
          </div>

          <div class="ivu-row bottom-line ivu-col-offset-6">
            <a-icon slot="prefix" type="user" />
            <input
              :placeholder="$t('login.userNamePlaceholder')"
              class="input"
              v-model="loginModel.username"
            />
          </div>
          <div class="ivu-row bottom-line ivu-col-offset-6">
            <a-icon slot="prefix" type="lock" />
            <input
              type="password"
              :placeholder="$t('login.passwrodPlaceholder')"
              class="input"
              v-model="loginModel.password"
            />
          </div>
          <!-- <div class="ivu-row ivu-col-offset-6" style="height:1px;">
            <div style="float:left">
              <a-checkbox @change="onChange" :checked="loginModel.rememberMe">自动登录</a-checkbox>
            </div>
            <div style="float:right">
              <a>忘记密码?</a>
            </div>
          </div>-->
          <div class="ivu-row ivu-col-offset-6" style>
            <button class="login-button" @click="sumbit">
              <span style="vertical-align: baseline;">登录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-layout {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
  background-image: url('../../assets/login/login-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  background-color: white;
}
.login-layout .login-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 900px;
  min-height: 550px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 30px 0 #ccc;
  z-index: 1;
  margin-bottom: 60px;
  padding-bottom: 30px;
}
.login-swiper-container {
  background-image: url('../../assets/login/login-default.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 420px;
  height: 340px;
  margin-left: 100px;
  margin-top: -76px;
  background-color: white;
  margin-top: 120px;
  background-position: 0 -34px;
}
.ivu-row {
  position: relative;
  margin-left: 0;
  margin-right: 0;
  height: auto;
  zoom: 1;
  display: block;
  margin-top: 40px;
  width: 270px;
}
.login-title {
  width: 340px;
  text-align: center;
  font-size: 34px;
  color: #666;
  margin-top: 54px;
}
.ivu-col-offset-6 {
  margin-left: 25%;
}
.input-user {
  border-top: none;
  border-left: none;
  border-right: none;
}
.input {
  border: none;
  outline: none;
}
.bottom-line {
  width: 270px;
  border-bottom: #ccc 1px solid;
}
.login-button {
  height: 44px;
  font-size: 15px;
  border-radius: 50px;
  color: white;
  border: none;
  margin-top: 40px;
  background: linear-gradient(90deg, #f89d3b, #ee2223);
  outline: none;
  width: 100%;
}
/* .spin-content{
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  } */
</style>
<script>
/* eslint-disable */
// import {Modal} from 'ant-design-vue';
import { mapActions } from 'vuex'
// import { login, getInfo, logout } from '@/api/login'
import { timeFix } from '@/utils/util'

export default {
  data() {
    return {
      loginModel: {
        userNameOrEmailAddress: '',
        password: '',
        rememberMe: false,
        state: {
          time: 60,
          loginBtn: false,
          // login type: 0 email, 1 username, 2 telephone
          loginType: 0,
          smsSendBtn: false
        }
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'GetInfo', 'Logout']),
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
      this.loginModel.RememberMe = e.target.checked
    },
    sumbit() {
      // this.api.test().then(data=>{
      //     console.warn(data);
      // })
      // this.$router.push({path:'/productList'})
      // this.state.loginBtn = true
      console.log(this.loginModel)

      this.Login(this.loginModel).then(res => this.loginSuccess(res))
      // .catch(err => this.requestFailed(err))
      // .finally(() => {
      //   // this.state.loginBtn = false
      // })
      // this.api.login(this.loginModel).then(data => {
      //   console.log(data)
      //   window.localStorage.setItem('token', data.data.accessToken)

      //   this.$router.push({ path: '/productList' })
      // })
    },
    loginSuccess(res) {
      console.log('成功')
      try {
        this.$router.push({ path: '/agenorder/quickOrder' })
      } catch (err) {}

      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).error.message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>