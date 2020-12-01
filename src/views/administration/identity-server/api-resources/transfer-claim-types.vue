<template>
  <a-transfer
    :dataSource="claim_types"
    :lazy="false"
    :titles="['不可用', '可用']"
    :render="render=>render.title"
    :listStyle="{
          width: width+'px',
          height: height+'px',
        }"
    :targetKeys="targetKeys"
    @change="handleChange"
  ></a-transfer>
</template>

<script>
import linq from 'linq'
export default {
  name: 'transfer-claim-types',
  data() {
    return {
      targetKeys: this.defaultKeys
    }
  },
  watch: {},
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    claim_types: {
      type: Array,
      default() {
        return []
      }
    },
    defaultKeys: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: [String, Number],
      default() {
        return 555
      }
    },
    width: {
      type: [String, Number],
      default() {
        return 212
      }
    }
  },
  methods: {
    handleChange(targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys
      var allowedScopes = [...this.value]

      moveKeys.forEach(function(item) {
        var index = allowedScopes.filter(function(currentValue, index) {
          if (currentValue.type == item) {
            allowedScopes.splice(index, 1)
            return index
          }
        })
      })

      targetKeys.forEach(function(item) {
        if (!linq.from(allowedScopes).any(c => c.type == item)) {
          //没有则添加
          allowedScopes.push({ type: item })
        }
      })
      this.$emit('input', allowedScopes)
    }
  }
}
</script>