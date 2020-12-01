<template>
  <a-modal
    :visible="visible"
    title="编辑"
    @cancel="handleCancel"
    :width="700"
    @ok="handleOk"
    :destroyOnClose="true"
    :maskClosable="false"
  >
    <div>
      <a-menu v-model="current" mode="horizontal" @select="select" theme="dark">
        <a-menu-item key="Basic">Basic</a-menu-item>
        <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper">Application Urls</span>
          <a-menu-item key="Callback">Callback</a-menu-item>
          <a-menu-item key="Signout">Signout</a-menu-item>
          <a-menu-item key="CORS" v-if="edit">CORS</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="Secrets">Secrets</a-menu-item>
        <a-sub-menu>
          <span slot="title" class="submenu-title-wrapper">Resources</span>
          <a-menu-item key="IdentityResources">Identity resources</a-menu-item>
          <a-menu-item key="ApiResources">Api resources</a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-if="edit">
          <span slot="title" class="submenu-title-wrapper">Advanced</span>
          <a-menu-item key="Tokens">Tokens</a-menu-item>
          <a-menu-item key="Claims">Claims</a-menu-item>
          <a-menu-item key="GrantTypes">Grant Types</a-menu-item>
          <a-menu-item key="Restrictions">Restrictions</a-menu-item>
          <a-menu-item key="Properties">Properties</a-menu-item>
        </a-sub-menu>
      </a-menu>
      <Basic v-show="hit('Basic')" />
      <Callback v-show="hit('Callback')" />
      <Signout v-show="hit('Signout')" />
      <CORS v-if="edit" v-show="hit('CORS')" />
      <Secrets v-model="client.clientSecrets" v-show="hit('Secrets')" />

      <IdentityResources v-show="hit('IdentityResources')" />
      <ApiResources v-show="hit('ApiResources')" />

      <Tokens v-if="edit" v-show="hit('Tokens')" />
      <GrantTypes v-if="edit" v-show="hit('GrantTypes')" />
      <Claims v-if="edit" v-model="client.claims" v-show="hit('Claims')" />
      <Restrictions v-if="edit" v-show="hit('Restrictions')" />
      <Properties v-if="edit" v-show="hit('Properties')" />
    </div>
  </a-modal>
</template>

<script>
import * as identity from '@/api/administration/identity'
import Basic from './client-details/Basic'
import Callback from './client-details/Callback'
import Signout from './client-details/Signout'
import CORS from './client-details/CORS'
import Secrets from './client-details/Secrets'
import Tokens from './client-details/Tokens'
import GrantTypes from './client-details/GrantTypes'
import Claims from './client-details/Claims'
import Restrictions from './client-details/Restrictions'
import Properties from './client-details/Properties'
import IdentityResources from './client-details/IdentityResources'
import ApiResources from './client-details/ApiResources'
import { from } from 'linq'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'client-detail',
  components: {
    Basic,
    Callback,
    Signout,
    CORS,
    Secrets,
    Tokens,
    GrantTypes,
    Claims,
    Restrictions,
    Properties,
    IdentityResources,
    ApiResources
  },
  data() {
    return {
      visible: false,
      current: ['Basic'],
      edit: true
    }
  },
  computed: {
    ...mapGetters(['client'])
  },
  methods: {
    ...mapActions(['GetClient', 'NewClient']),
    hit(key) {
      return from(this.current).any(c => c == key)
    },
    show(id) {
      if (id) {
        this.GetClient(id).then(data => {
          this.visible = true
        })
      } else {
        this.NewClient()
        this.edit = false
        this.visible = true
      }
    },
    select(e) {
      console.log(e, this.current)
    },
    handleOk() {
      const _this = this;
      if(this.client.redirectUris.length<=0){
        this.$error({title:'校验失败',content:"回调地址必须填写客户端才能访问"});
        return;
      }
      if(this.client.clientSecrets.length<=0){
        this.$error({title:'校验失败',content:"客户端密钥必须填写客户端才能访问"});
        return;
      }
      if (this.edit) {
        identity.update_client(this.client.id, this.client).then(res => {
          _this.$message.success('修改成功')
          this.visible = false
        })
      } else {
        identity.create_client(this.client).then(res => {
          _this.$message.success('添加成功,请刷新页面')
          this.visible = false
        })
      }
    },
    handleCancel() {
      this.visible = false
    }
  },
  mounted() {}
}
</script>

<style >
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
