<template>
  <a-card :bordered="false" :style="{ height: '100%' }">
    <a-row :gutter="24">
      <a-col :md="4">
        <a-list itemLayout="vertical" :dataSource="roles">
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-list-item-meta :style="{ marginBottom: '0' }">
              <span
                slot="description"
                style="text-align: center; display: block"
                v-if="item.isDefault"
              >默认角色</span>
              <span
                slot="description"
                style="text-align: center; display: block"
                v-if="item.isPublic"
              >公共角色</span>
              <span
                slot="description"
                style="text-align: center; display: block"
                v-if="item.isStatic"
              >系统角色</span>
              <span
                slot="description"
                style="text-align: center; display: block"
                v-if="item.describe"
              >{{item.describe}}</span>
              <a
                slot="title"
                style="text-align: center; display: block"
                @click="edit(item)"
              >{{ item.name }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :md="20">
        <div style="max-width: 800px">
          <a-divider v-if="isMobile()" />
          <div v-if="mdl.id">
            <div style="float:left">
              <h3>角色：{{ mdl.name }}</h3>
            </div>
            <div style="float:right">
              <a-popconfirm title="该操作无法恢复,确认删除吗?" @confirm="delRole" v-if="!mdl.isStatic">
                <a-button type="dashed">{{$t('table.delete')}}</a-button>
              </a-popconfirm>
            </div>
            <div style="clear: both;"></div>
          </div>
          <a-form :form="form" :layout="isMobile() ? 'vertical' : 'horizontal'">
            <a-form-item label="角色名称">
              <a-input v-model="mdl.name" placeholder="请填写角色名称" />
            </a-form-item>
            <a-form-item label="角色类型">
              <a-checkbox :checked="mdl.isDefault" @click="defaultClick">默认</a-checkbox>
              <a-checkbox :checked="mdl.isPublic" @click="publicClick">公共</a-checkbox>
            </a-form-item>
            <!-- <a-form-item label="备注说明">
              <a-textarea
                :row="3"
                v-decorator="[ 'describe', {rules: [{ required: true, message: 'Please input role name!' }]} ]"
                placeholder="请填写角色名称"
              />
            </a-form-item>-->
            <a-skeleton active :loading="loading">
              <a-form-item label="拥有权限">
                <a-row :gutter="16" v-for="(permission, index) in role.groups" :key="index">
                  <a-col :xl="5" :lg="24">{{ permission.displayName }}</a-col>
                  <a-col :xl="18" :lg="24">
                    <!-- <a-checkbox
                    :indeterminate="permission.indeterminate"
                    :checked="permission.checkedAll"
                    @change="onChangeCheckAll($event, permission)"
                    >全选</a-checkbox>-->

                    <a-row v-for="(p,pindex) in parentName(permission.permissions)" :key="pindex">
                      <a-col :span="7">
                        <a-checkbox
                          :checked="!p.indeterminate&&p.isGranted"
                          :indeterminate="p.indeterminate"
                          @change="pRoleChange($event,p,permission)"
                        >{{p.displayName}}</a-checkbox>
                      </a-col>
                      <a-col>
                        <a-checkbox
                          v-for="(pp,ppindex) in parentChild(permission.permissions,p.name)"
                          :key="ppindex"
                          @change="roleChange($event,pp,p.name,permission)"
                          :checked="pp.isGranted"
                        >{{pp.displayName}}</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :xl="12"></a-col>
                </a-row>
              </a-form-item>
            </a-skeleton>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <div>
      <a-button type="primary" @click="save">保存</a-button>
    </div>
  </a-card>
</template>

<script>
// import { getRoleList, getPermissions } from '@/api/manage'
import { mixinDevice } from '@/utils/mixin'
import { actionToObject } from '@/utils/permissions'
import pick from 'lodash.pick'
import * as corpRole from '@/api/corp/role'
import { from } from 'linq'
import { isNullOrUndefined } from 'util'


export default {
  name: 'RoleList',
  mixins: [mixinDevice],
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      mdl: {},
      role: {},
      roles: [],
      permissions: [],
      providerKey: '',
      // providerName: 'Role', 1.0 将Role改为R
      providerName: 'R',
      loading: true
    }
  },
  created() {
    corpRole.getRoles().then(data => {
      data.items.push({
        id: undefined,
        isDefault: false,
        isPublic: false,
        isStatic: false,
        name: '新增角色',
        describe: '新增一个角色'
      })
      this.roles = data.items
    })
    // corpRole.getPermissions('Role', 'admin').then(data => {
    //   console.log(data)
    //   this.role = data
    // })
    // getRoleList().then((res) => {
    //   this.roles = res.result.data
    //   this.roles.push({
    //     id: '-1',
    //     name: '新增角色',
    //     describe: '新增一个角色'
    //   })
    //   console.log('this.roles', this.roles)
    // })
    // this.loadPermissions()
  },
  methods: {
    parentName(permissions) {
      return from(permissions).where(c => isNullOrUndefined(c.parentName))
    },
    parentChild(permissions, parentName) {
      return from(permissions).where(c => c.parentName == parentName)
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
    save() {
      var scope = this

      if (this.mdl.isStatic || this.providerKey == 'admin') {
        this.$message.warning('系统管理员不允许修改')
        return
      }
      var Permissions = []
      this.role.groups.forEach(element => {
        element.permissions.forEach(permission => {
          Permissions.push({ name: permission.name, isGranted: permission.isGranted })
        })
      })
      scope.providerKey = scope.mdl.name
      if (scope.mdl.id) {
        // delete scope.concurrencyStamp
        corpRole.updateRole(scope.mdl.id, scope.mdl).then(data => {
          corpRole.savePermissions(scope.providerName, scope.providerKey, { permissions: Permissions }).then(c => {
            scope.$message.success('角色权限保存成功');
            window.location.reload();
          })
        })
      } else {
        corpRole.createRole(scope.mdl).then(data => {
          corpRole.savePermissions(scope.providerName, scope.providerKey, { permissions: Permissions }).then(c => {
            scope.$message.success('角色权限保存成功');
          })
        })
      }
    },
    callback(val) {
      console.log(val)
    },

    add() {
      this.edit({ id: 0 })
    },
    loadPermissions() {
      this.loading = true
      corpRole.getPermissions(this.providerName, this.providerKey).then(data => {
        this.role = data
        this.loading = false
      })
    },
    defaultClick() {
      this.mdl.isDefault = !this.mdl.isDefault
    },
    publicClick() {
      this.mdl.isPublic = !this.mdl.isPublic
    },
    edit(record) {
      this.mdl = Object.assign({}, record)

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'))
      })
      // 有权限表，处理勾选
      // console.log(this.mdl.name);
      this.providerKey = this.mdl.name

      this.loadPermissions()
    },
    delRole() {
      var id = this.mdl.id
      corpRole.delRole(id).then(data => {
        this.$message.success('角色删除成功')
        for (let index = 0; index < this.roles.length; index++) {
          const element = this.roles[index]
          if (element.id == id) {
            this.roles.splice(index, 1)
            break
          }
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
