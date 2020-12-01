<template>
  <a-modal
    :visible="visable"
    title="编辑"
    @cancel="handleCancel"
    @ok="handleOk"
    :destroyOnClose="true"
    :maskClosable="false"
  >
    <a-tabs>
      <a-tab-pane key="1" tab="基本信息">
        <a-form>
          <a-form-item label="标志">
            <a-input v-model="model.name"></a-input>
          </a-form-item>
          <a-form-item label="名称">
            <a-input v-model="model.displayName"></a-input>
          </a-form-item>
          <a-form-item label="描述">
            <a-input v-model="model.description"></a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="model.enabled">启用</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="model.required">必须</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="model.emphasize">Emphasize</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model="model.showInDiscoveryDocument">Show In Discovery Document</a-checkbox>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Claims">
        <a-transfer
          :dataSource="items"
          :lazy="false"
          :titles="['不可用', '可用']"
          :render="render=>render.title"
          :listStyle="{
          width: '212px',
          height: '555px',
        }"
          :targetKeys="targetKeys"
          @change="handleChange"
        ></a-transfer>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script>
import { all_claim_types } from '@/api/administration/identity'
import { get, create, update } from '@/api/administration/identity-resources'

import { mapGetters, mapActions } from 'vuex'
import linq from 'linq'

export default {
  name: 'identity-resources-edit',
  data() {
    return {
      visable: false,
      items: [],
      targetKeys: [],
      edit: true,
      model: {
        name: undefined,
        displayName: undefined,
        description: undefined,
        enabled: true,
        required: false,
        emphasize: false,
        showInDiscoveryDocument: true,
        userClaims: []
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
      this.items = items
      // this.targetKeys = keys
    })
  },
  methods: {
    handleChange(targetKeys, direction, moveKeys) {
      console.log('targetKeys:',targetKeys,'moveKeys:',moveKeys);
      
      this.targetKeys = targetKeys
      var allowedScopes = [...this.model.userClaims]

      moveKeys.forEach(function(item) {
        var index = allowedScopes.filter(function(currentValue, index) {
          if (currentValue.type == item) {
             allowedScopes.splice(index, 1)
            return index;
          }
        })
      })

      targetKeys.forEach(function(item) {
        if (!linq.from(allowedScopes).any(c => c.type == item)) {
          //没有则添加
          allowedScopes.push({ type: item })
          // allowedScopes.push({ clientId: clientId, scope: item })
        }
      })
      console.log(allowedScopes)
      this.model.userClaims = allowedScopes
    },
    show(id) {
      this.visable = true
      if (id) {
        get(id).then(res => {
          this.model = res
          var allowedScopes = res.userClaims
          var keys = []
          console.log(allowedScopes, this.items)

          var items = this.items.forEach(element => {
            if (linq.from(allowedScopes).any(c => c.type == element.key)) {
              keys.push(element.key)
            }
          })

          this.targetKeys = keys
        })
      } else {
        this.edit = false
      }
    },
    handleOk() {
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