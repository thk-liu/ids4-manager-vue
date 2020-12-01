<template>
  <a-modal :visible="visible" :title="edit?'编辑':'新增'" @ok="handleOk" @cancel="handleCancel">
    <a-form>
      <a-form-item label="版本名称">
        <a-input v-model="model.name"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { get, update, create } from '@/api/administration/editions'

export default {
  data() {
    return {
      visible: false,
      edit: true,
      model: { name: undefined }
    }
  },
  methods: {
    show(id) {
      if (id) {
        get(get).then(data => {
          this.model = data
          this.visible = true
        })
      } else {
        this.edit = false
        this.visible = true
      }
    },
    close() {
      this.visible = false
      this.$emit('close')
    },
    handleOk() {
      if (this.edit) {
        update(this.model.id, this.model).then(res => {
          this.$message.success('更新成功')
          this.close()
        })
      } else {
        create(this.model).then(res => {
          this.$message.success('添加成功')
          this.close()
        })
      }
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>