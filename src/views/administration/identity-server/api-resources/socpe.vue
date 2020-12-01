<template>
  <div>
    <a-row>
      <a-tabs>
        <a-tab-pane key="info" tab="基本信息">
          <a-form>
            <a-row :gutter="40">
              <a-col :span="12">
                <a-form-item label="名称:">
                  <a-input v-model="model.name"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="显示名称:">
                  <a-input v-model="model.displayName"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="描述:">
              <a-input v-model="model.description"></a-input>
            </a-form-item>
            <a-row>
              <a-col :span="8">
                <a-form-item>
                  <a-checkbox v-model="model.enabled" checked>启用</a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-checkbox v-model="model.emphasize">Emphasize</a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-checkbox v-model="model.showInDiscoveryDocument">Show In Discovery Document</a-checkbox>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="claims" tab="Claims">
          <transfer-claim-types
            :claim_types="claim_types"
            :height="310"
            v-model="model.userClaims"
          />
        </a-tab-pane>
      </a-tabs>

      <a-button type="primary" icon="plus" class="m-r" @click="addItem">添加</a-button>
    </a-row>
    <a-card :title="item.name" :key="index" v-for="(item,index) in apiResources.scopes">
      <a-button type="primary" icon="delete" slot="extra" @click="delItem(index)">删除</a-button>
      <a-tabs>
        <a-tab-pane key="info" tab="基本信息">
          <a-form>
            <a-row :gutter="40">
              <a-col :span="12">
                <a-form-item label="名称:">
                  <a-input v-model="item.name"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="显示名称:">
                  <a-input v-model="item.displayName"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="描述:">
              <a-input v-model="item.description"></a-input>
            </a-form-item>
            <a-row>
              <a-col :span="8">
                <a-form-item>
                  <a-checkbox v-model="item.enabled">启用</a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-checkbox v-model="item.emphasize">Emphasize</a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-checkbox v-model="item.showInDiscoveryDocument">Show In Discovery Document</a-checkbox>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="claims" tab="Claims">
          <transfer-claim-types
            :claim_types="claim_types"
            :height="310"
            v-model="item.userClaims"
            :defaultKeys="GetClaimsDefaultKeys(item.userClaims)"
          />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import transfer from './transfer-claim-types'
import { mapState, mapGetters, mapActions } from 'vuex'
import linq from 'linq'
export default {
  data() {
    return {
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
  components: {
    'transfer-claim-types': transfer
  },
  computed: {
    ...mapGetters(['apiResources'])
  },
  methods: {
    GetClaimsDefaultKeys(items) {
      return linq
        .from(items)
        .select(c => c.type)
        .toArray()
    },
    onCheckChange(item, e) {
      console.log(item, e)
      item = e.target.checked
    },
    addItem() {
      this.apiResources.scopes.push(this.model)
      this.model = {
        name: undefined,
        displayName: undefined,
        description: undefined,
        enabled: true,
        required: false,
        emphasize: false,
        showInDiscoveryDocument: true,
        userClaims: []
      }
    },
    delItem(index) {
      this.apiResources.scopes.splice(index, 1)
    }
  },
  props: {
    claim_types: {
      type: Array,
      default() {
        return []
      }
    },
    showAdd: {
      type: Boolean,
      default() {
        return true
      }
    }
  }
}
</script>