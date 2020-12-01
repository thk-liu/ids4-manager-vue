<template>
  <a-modal
    :visible="visable"
    title="编辑"
    @cancel="handleCancel"
    @ok="handleOk"
    :destroyOnClose="true"
    :maskClosable="false"
    :width="660"
  >
    <a-tabs>
      <a-tab-pane key="1" tab="基本信息">
        <a-form>
          <a-form-item label="名称:">
            <a-input v-model="model.name"></a-input>
          </a-form-item>
          <a-form-item label="显示名称:">
            <a-input v-model="model.displayName"></a-input>
          </a-form-item>
          <a-form-item label="描述:">
            <a-input v-model="model.description"></a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="model.enabled">启用</a-checkbox>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="Claims" tab="Claims">
        <transfer-claim-types
          :claim_types="claim_types"
          v-model="model.userClaims"
          :defaultKeys="GetClaimsDefaultKeys(model.userClaims)"
        />
      </a-tab-pane>
      <a-tab-pane key="scopes" tab="scopes" v-if="edit">
        <scope :claim_types="claim_types" v-model="model.scopes" />
      </a-tab-pane>
      <a-tab-pane key="secrets" tab="Secrets" v-if="edit">
        <secrets  v-model="model.secrets" />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import { all_claim_types } from '@/api/administration/identity'
import { get, create, update } from '@/api/administration/api-resources'
import { mapActions } from 'vuex'
import secrets from './client-details/Secrets'
import scope from './api-resources/socpe'
import transfer from './api-resources/transfer-claim-types'
import linq from 'linq'

export default {
  data() {
    return {
      visable: false,
      claim_types: [],
      targetKeys: [],
      edit: true,
      model: {
        name: undefined,
        displayName: undefined,
        description: undefined,
        enabled: true,
        properties: {},
        userClaims: [],
        scopes: [],
        secrets: []
      }
    }
  },
  mounted() {
    all_claim_types().then(res => {
      var items = []
      var keys = []
      for (let index = 0; index < res.length; index++) {
        const element = res[index]
        const data = {
          key: element.name,
          title: element.name,
          displayName: element.name
        }
        items.push(data)
      }

      this.claim_types = items
      console.log(this.claim_types)
      // this.targetKeys = keys
    })
  },
  components: {
    secrets,
    scope,
    'transfer-claim-types': transfer
  },
  methods: {
    ...mapActions(['SetApiResources']),
    GetClaimsDefaultKeys(items) {
      return linq
        .from(items)
        .select(c => c.type)
        .toArray()
    },
    show(id) {
      if (id) {
        get(id).then(res => {
          this.model = res
          this.SetApiResources(res)
          this.visable = true
        })
      } else {
        this.edit = false
        this.visable = true
      }
    },
    handleOk() {
      console.log('model：', this.model)
      if (this.edit) {
        update(this.model.id, this.model).then(data => {
          this.$message.success('修改成功')
          this.visable = false
        })
      } else {
        create(this.model).then(data => {
          this.$message.success('添加成功')
          this.visable = false
        })
      }
    },
    handleCancel() {
      this.visable = false
    }
  }
}
</script>