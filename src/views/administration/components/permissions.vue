<template>
  <a-modal title="Permissions" v-model="visible" @ok="handleOk" :destroyOnClose="true" :width="650">
    <a-checkbox>授予所有权限</a-checkbox>
    <a-divider></a-divider>
    <a-tabs tabPosition="left">
      <a-tab-pane :tab="item.displayName" v-for="(item,index) in permission" :key="index+1">
        <a-checkbox>全选</a-checkbox>
        <a-divider></a-divider>
        <a-row v-for="(p,pindex) in parentName(item.permissions)" :key="pindex">
          <a-checkbox
            :checked="!p.indeterminate&&p.isGranted"
            :indeterminate="p.indeterminate"
            @change="pRoleChange($event,p,permission)"
            :disabled="disable(p.grantedProviders)"
          >{{p.displayName}}   <span style="font-weight: bold;">{{displayGrantedProvider(p.grantedProviders)}}</span></a-checkbox>
          <div >
            <a-checkbox
              v-for="(pp,ppindex) in parentChild(item.permissions,p.name)"
              :key="ppindex"
              style="margin-left:20px;display:block"
              @change="roleChange($event,pp,p.name,permission)"
              :checked="pp.isGranted"
              :disabled="disable(pp.grantedProviders)"
            >{{pp.displayName}} 
            <span style="font-weight: bold;">
            {{displayGrantedProvider(pp.grantedProviders)}}  </span> </a-checkbox>
          </div>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import * as permissions from '@/api/corp/role'
import { from } from 'linq'
import { isNullOrUndefined } from 'util'
export default {
  data() {
    return {
      visible: false,
      permission: [],
      providerKey:"",
    }
  },
  computed: {
    modal_title() {
      return 'Permissions' + this.providerKey
    }
  },
  props: {
    providerName: { type: String, required: true },
  },
  methods: {
    disable(grantedProviders){
    //     var key=this.providerKey;
    //   return  !from(grantedProviders).any(c=>c.providerKey==key);
        if(this.providerName!="R"){
            return true;
        }
        return false;
    },
    displayGrantedProvider(grantedProviders){
        if(this.disable(grantedProviders)){
         console.log(grantedProviders)
           return from(grantedProviders).select(c=>`${c.providerName}:${c.providerKey}`).toArray().join(";")
        }
    },
    parentName(permission) {
      return from(permission).where(c => isNullOrUndefined(c.parentName))
    },
    parentChild(permission, parentName) {
      return from(permission).where(c => c.parentName == parentName)
    },
    getChilds(parentName) {
      let scope = this
      //获取子集合
      // this.role.groups.map
      array.forEach(element => {})
      this.role.groups.map(c => {
        return scope.parentChild(c.permissions, parentName)
      })
    },
    pRoleChange(event, record, permission) {
      record.isGranted = event.target.checked
      record.indeterminate = false
      //将余下的都设置同样状态
      var data = this.parentChild(permission.permissions, record.name).toArray()
      data.map(c => (c.isGranted = event.target.checked))

      console.log(data)
    },
    roleChange(event, record, parentName, permission) {
      record.isGranted = event.target.checked
      var p = from(permission.permissions).firstOrDefault(c => c.name == parentName)

      if (from(this.parentChild(permission.permissions, parentName)).all(c => c.isGranted == record.isGranted)) {
        p.isGranted = event.target.checked
        p.indeterminate = false
      } else {
        p.isGranted = event.target.checked
        p.indeterminate = true
      }
    },
    show(providerKey) {
      this.visible = true
      this.providerKey=providerKey;
      permissions.getPermissions(this.providerName, this.providerKey).then(data => {
        this.permission = data.groups
      })
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