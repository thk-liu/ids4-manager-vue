<template>
  <a-modal
    title="Claims"
    v-model="visible"
    @ok="handleOk"
    :maskClosable="false"
    :destroyOnClose="destroyOnClose"
    @cancel="cancel"
    ref="modal"
  >
    <a-row :gutter="48">
      <a-col :md="12">
        <a-form-item label="Type">
          <a-select
            showSearch
            placeholder="Select a Claims"
            optionFilterProp="children"
            style="width: 200px"
            v-model="type"
          >
            <a-select-option
              :value="type.name"
              v-for="(type,index) in claim_types"
              :key="index"
            >{{type.name}}</a-select-option>
            <!-- <a-select-option value="jack">Jack</a-select-option> -->
          </a-select>
          <!-- <a-input v-model="type" /> -->
        </a-form-item>
      </a-col>
      <a-col :md="12">
        <a-form-item label="Value">
          <a-input v-model="value" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-button type="primary" icon="plus" style="width:100%" @click="addItem">添加Claim</a-button>
    <a-divider></a-divider>
    <a-input
      v-for="(item,index) in claims"
      :key="index"
      :addonBefore="item.claimType"
      v-model="item.claimValue"
      style=" margin-bottom: 10px;"
    >
      <a-icon slot="addonAfter" type="delete" @click="deleteItem(index)" />
    </a-input>
  </a-modal>
</template>

<script>
import * as identity from '@/api/administration/identity'
export default {
  data() {
    return {
      visible: false,
      destroyOnClose: true,
      loading: false,
      id: '',
      type: '',
      value: '',
      claims: [],
      claim_types: []
    }
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    show(id) {
      this.id = id
      this.visible = true
      if (this.mode == 'role') {
        identity.roles_claims(id).then(data => {
          this.claims = data
        })
      } else {
        identity.users_claims(id).then(data => {
          this.claims = data
        })
      }
    },
    addItem() {
      //TODO:检查是否重复
      this.claims.push({ id: this.id, claimType: this.type, claimValue: this.value })
    },
    handleOk() {
      if (this.mode == 'role') {
      } else {
        identity.put_user_claim_types(this.id, this.claims).then(data => {
          console.log(data)
        })
      }
      this.visible = false
    },
    cancel(e) {
      //手动销毁
      //    console.log(this.$refs.modal);
      //    this.$refs.modal.destroy()
      //  this.$confirm({
      //   title: '确定关闭吗?',
      //   content: '您有未保存的更改.',
      //   okText: '确认',
      //   cancelText: '取消',
      // });
    },

    deleteItem(index) {
      this.claims.splice(index, 1)
      // console.log('删除行数据',tt);
    }
  },
  mounted() {
    identity.all_claim_types().then(data => {
      this.claim_types = data
    })
  },
  props: {
    mode: String
  }
}
</script>

<style scoped>
.claims_item {
  margin-bottom: 10px;
}
</style>