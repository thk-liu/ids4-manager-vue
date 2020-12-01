<template>
  <a-tree-select
    style="width:200px"
    :dropdownStyle="{ maxHeight: maxHeight, overflow: 'auto' }"
    @change="change"
    :treeData="treeData"
    :placeholder="$t('page.select')"
    :multiple="multiple"
    treeDefaultExpandAll
    allowClear
    v-model="value"
  >
    <!-- <span style="color: #08c" slot="title" slot-scope="{key, value}" v-if="key='0-0-1'">
      Child Node1 {{value}}
    </span>-->
  </a-tree-select>
</template>

<script>
import { getTreeData } from '@/api/agent/agentCategory'

const treeData = []

export default {
  data() {
    return {
      defaultValue: undefined,
      treeData
    }
  },
  mounted() {
    getTreeData().then(data => {
      this.treeData = data
    })
  },
  watch: {
    defaultValue(value) {},
    value(value) {
      if (value) {
        this.defaultValue = value
      }
    }
  },
  methods: {
    change(value) {
      this.$emit('func', value)
    }
  },
  props: {
    msg: String,
    maxHeight: {
      type: String,
      default: '400px'
    },
    value: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped >
</style>
