<template>
  <div class="m-t-10">
    <h2>Identity resources</h2>
    <a-transfer
      :dataSource="items"
      :lazy="false"
      :titles="['不可用', '可用']"
      :render="renderItem"
      :listStyle="{
      width: '300px',
      height: '300px',
    }"
      :targetKeys="targetKeys"
      @change="handleChange"
    ></a-transfer>
  </div>
</template>
<script>
import { getAll } from '@/api/administration/identity-resources'
import { mapGetters, mapActions } from 'vuex'
import linq from 'linq'

export default {
  data() {
    return {
      items: [],
      targetKeys: []
    }
  },
  mounted() {
    getAll({ maxResultCount: 1000 }).then(res => {
      var items = []
      var keys = []
      var allowedScopes = this.client.allowedScopes
      for (let index = 0; index < res.items.length; index++) {
        const element = res.items[index]
        const data = {
          key: element.name,
          title: element.name,
          displayName: element.displayName
        }
        items.push(data)
        if (linq.from(allowedScopes).any(c => c.scope == element.name)) {
          keys.push(element.name)
        }
      }
      this.items = items
      this.targetKeys = keys
      console.log('targetKeys',this.targetKeys);
    })
  },
  computed: {
    ...mapGetters(['client'])
  },

  methods: {
    renderItem(item) {
      const customLabel = <span class="custom-item">{item.displayName}</span>

      return {
        label: customLabel, // for displayed item
        value: item.title // for title and filter matching
      }
    },
    handleChange(targetKeys, direction, moveKeys) {
      // console.log(targetKeys, direction, moveKeys)
      console.log(moveKeys)

      this.targetKeys = targetKeys
      var allowedScopes =[...this.client.allowedScopes]
      var clientId = this.client.id

      moveKeys.forEach(function(item) {
        var index = allowedScopes.filter(function(currentValue, index) {
          if (currentValue.scope == item) {
            return index
          }
        })
        allowedScopes.splice(index, 1)
      })

      targetKeys.forEach(function(item) {
        if (!linq.from(allowedScopes).any(c => c.scope == item)) {
          //没有则添加
           allowedScopes.push({scope: item })
          // allowedScopes.push({ clientId: clientId, scope: item })
        }
      })

      console.log(allowedScopes)
      this.client.allowedScopes = allowedScopes
    }
  }
}
</script>