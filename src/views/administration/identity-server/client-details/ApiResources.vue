<template>
  <div class="m-t-10">
    <h2>Api Resources</h2>
    <a-transfer
    :lazy="false"
      :dataSource="items"
      :titles="['不可用', '可用']"
      :listStyle="{
      width: '300px',
      height: '300px',
    }"
    :render="item=>item.displayName"
      :targetKeys="targetKeys"
      @change="handleChange"
    ></a-transfer>
  </div>
</template>
<script>
import { api_resources } from '@/api/administration/identity'
import linq from 'linq'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [],
      targetKeys: []
    }
  },
  computed: {
    ...mapGetters(['client'])
  },
  mounted() {
    api_resources({ maxResultCount: 1000 }).then(res => {
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
        if (linq.from(allowedScopes).any(c => c.scope == data.key)) {
          keys.push(element.name)
        }
      }
      this.items = items
      this.targetKeys = keys
    })
  },
  methods: {
    handleChange(targetKeys, direction, moveKeys) {
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
          allowedScopes.push({ clientId: clientId, scope: item })
        }
      })

      this.client.allowedScopes = allowedScopes
    }
  }
}
</script>