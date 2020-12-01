<template>
  <div class="m-t-10">
    <h4>Tokens</h4>
    <a-form layout="horizontal">
      <a-form-item label="访问令牌有效期" v-bind="formItemLayout">
        <a-input-number v-model="client.accessTokenLifetime" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="Access Token Type" v-bind="formItemLayout">
        <a-input-number v-model="client.accessTokenType" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="Consent Lifetime" v-bind="formItemLayout">
        <a-input-number v-model="client.consentLifetime" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="Pair Wise Subject Salt" v-bind="formItemLayout">
        <a-input v-model="client.pairWiseSubjectSalt" ></a-input>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-model="client.includeJwtId">Include Jwt Id</a-checkbox>
      </a-form-item>
      <a-form-item label="User Sso Lifetime" v-bind="formItemLayout">
        <a-input-number v-model="client.userSsoLifetime" style="width:100%"></a-input-number>
      </a-form-item>
      <a-form-item label="User Code Type" v-bind="formItemLayout">
        <a-input v-model="client.userCodeType"></a-input>
      </a-form-item>
      <a-form-item label="Device Code Type" v-bind="formItemLayout">
        <a-input-number v-model="client.deviceCodeLifetime"></a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
  }
}
</script>