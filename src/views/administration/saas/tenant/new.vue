<template>
  <a-modal :visible="visible" @ok="handleOk" @cancel="handelCancel">
    <a-form>
      <a-form-item label="租户名称:">
        <a-input v-model="model.name"></a-input>
      </a-form-item>
      <a-form-item label="版本">
        <a-select :defaultValue="model.editionId">
          <a-select-option
            :value="item.id"
            v-for="(item,index) in editions"
            :key="index"
            @click="select"
          >{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Admin邮箱:">
        <a-input v-model="model.email"></a-input>
      </a-form-item>
      <a-form-item label="Admin密码:">
         <a-input placeholder="input password" v-model="model.password" />
         <!-- <a-input-password placeholder="input password" v-model="model.password" /> -->
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { get, update, create } from '@/api/administration/tenancy'
import { all as allEdition } from '@/api/administration/editions'
export default {
  data() {
    return { visible: false, edit: true, model: { name: '', editionId: '',adminPassword:undefined,adminEmailAddress:undefined } }
  },
  mounted() {
    allEdition({ maxResultCount: 100 }).then(res => {
      this.editions = res.items
    })
  },
  methods: {
    show(id) {
      if (id) {
        get(id).then(res => {
          this.model = res
          this.visible = true
        })
      } else {
        this.visible = true
        this.edit = false
      }
    },
    select(e) {
      this.model.editionId = e.key
    },
    handelCancel() {
      this.visible = false
    },
    close(tips) {
      this.$message.success(tips)
      this.visible = false
      this.$emit('close')
    },
    handleOk() {
      this.model.id
        ? update(this.model.id, this.model).then(res => this.close('更新成功'))
        : create(this.model).then(res => this.close('添加成功'))
    }
  }
}
</script>