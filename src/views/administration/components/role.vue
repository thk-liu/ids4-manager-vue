<template>
  <a-modal :title="title" v-model="visible" @ok="handleOk" :destroyOnClose="true">
    <a-row :gutter="48">
      <a-col>
        <a-form-item label="角色名称*:">
          <a-input v-model="role.name" />
        </a-form-item>
      </a-col>
    </a-row>
    <div>
      <a-checkbox style="dislplay:bolck" v-model="role.isDefault">默认</a-checkbox>
    </div>
    <div>
      <a-checkbox  v-model="role.isPublic">公开</a-checkbox>
    </div>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      role:{
        id: undefined,
        isDefault: false,
        isPublic: false,
        isStatic: false,
        name: '',
        describe: ''
      },
    }
  },
  computed:{
    title(){
        return this.role.id?"编辑角色":"新增角色";
    }
  },
  methods: {
    show(role) {
      this.visible = true;
      if(role){
          this.role=role;
      }
    },
    addItem() {
      //TODO:检查是否重复
      this.claims.push({ type: this.type, value: this.value })
    },
    handleOk() {
      this.visible = false
    },
    deleteItem(index) {
      this.claims.splice(index, 1)
      // console.log('删除行数据',tt);
    }
  }
}
</script>

<style scoped>
.claims_item {
  margin-bottom: 10px;
}
</style>