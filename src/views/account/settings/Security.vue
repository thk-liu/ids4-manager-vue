<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{ item.description }}</span>
            <span v-if="item.value">:</span>
            <span class="security-list-value">{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>
    <a-modal
      :visible="password_visible"
      title="修改密码"
      okText="修改密码"
      @ok="passwordSubmit"
      @cancel="cancel"
      :maskClosable="false"
      :destroyOnClose="true"
    >
      <a-form :form="form">
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="原密码">
          <a-input
            v-decorator="['currentPassword', { rules: [{ required: true, message: '原始密码必须输入!' }] }]"
            placeholder="请输入原始密码"
          ></a-input>
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="新密码">
          <a-input
            v-decorator="[
              'newPassword',
              {
                rules: [
                  { required: true, message: '请设置新密码', trigger: 'blur' },
                  { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' },
                ],
              },
            ]"
            placeholder="请输入您的新密码"
          ></a-input>
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="确认密码">
          <a-input
            v-decorator="[
              'newPassword1',
              {
                rules: [
                  { required: true, message: '请设置新密码', trigger: 'blur' },
                  { validator: compareToFirstPassword },
                ],
              },
            ]"
            placeholder="请再次输入您的新密码"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import schema from 'async-validator'
// import { changePassword } from '@/api/corp/corpUser'

export default {
  data() {
    return {
      password_visible: false,
      form: this.$form.createForm(this, { name: 'password' }),
      data: [
        {
          title: '账户密码',
          description: '当前密码强度',
          value: '强',
          actions: {
            title: '修改',
            callback: () => {
              // this.$message.info('This is a normal message')
              this.password_visible = true
            },
          },
        },
        {
          title: '密保手机',
          description: '已绑定手机',
          value: '138****8293',
          actions: {
            title: '修改',
            callback: () => {
              this.$message.success('This is a message of success')
            },
          },
        },
        // { title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '设置', callback: () => { this.$message.error('This is a message of error') } } },
        // { title: '备用邮箱', description: '已绑定邮箱', value: 'ant***sign.com', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning') } } },
        // { title: 'MFA 设备', description: '未绑定 MFA 设备，绑定后，可以进行二次确认', value: '', actions: { title: '绑定', callback: () => { this.$message.info('This is a normal message') } } }
      ],
    }
  },
  methods: {
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('确认密码与新密码不一致!')
        // callback('Two passwords that you enter is inconsistent!');
      } else {
        callback()
      }
    },
    cancel() {
      this.password_visible = false
    },
    passwordSubmit(e) {
      e.preventDefault()
      const taskForm = new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (err) {
            reject(err)

            return
          }
          resolve(values)
        })
      })
      taskForm.then(() => {
        changePassword(this.form.getFieldValue('currentPassword'), this.form.getFieldValue('newPassword'))
          .then((data) => {
            this.$message.success('修改密码成功')
            this.password_visible = false
          })
          .catch((err) => {
            console.log(err.response)

            this.$error({
              title: '失败',
              content: ((err.response || {}).data || {}).error.message || '请求出现错误，请稍后再试',
            })
            // this.$message.error('修改密码失败')
          })
      })
    },
  },
}
</script>

<style scoped>
</style>
