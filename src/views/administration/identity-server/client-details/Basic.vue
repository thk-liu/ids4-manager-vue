<template>
  <div class="m-t-10">
    <a-form layout="horizontal">
        <a-form-item label="clientId" v-bind="formItemLayout">
        <a-input v-model="client.clientId"></a-input>
      </a-form-item>
      <a-form-item label="应用程序名称" v-bind="formItemLayout">
        <a-input v-model="client.clientName"></a-input>
      </a-form-item>
      <a-form-item label="描述" v-bind="formItemLayout">
        <a-input v-model="client.description"></a-input>
      </a-form-item>
      <a-form-item label="客户端地址" v-bind="formItemLayout">
        <a-input v-model="client.clientUri"></a-input>
      </a-form-item>
      <a-form-item label="Logo地址" v-bind="formItemLayout">
        <a-input v-model="client.logoUri"></a-input>
      </a-form-item>

      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-model="client.requireConsent">需要同意</a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-model="client.allowRememberConsent">允许记住同意</a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-model="client.enabled">启用</a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-model="client.allowOfflineAccess">允许离线访问</a-checkbox>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Basic',
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 18 },
          sm: { span: 12 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 4
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['client'])
  },
  methods: {}
}
</script>