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
    <!-- <span
      style="color: #08c"
      slot="title"
      slot-scope="{key, value}"
      v-if="key='0-0-1'"
    >Child Node1 {{value}}</span>-->
  </a-tree-select>
</template>

<script>
import { getTreeData } from '@/api/agent/agentArea'

const treeData = []

export default {
  data() {
    return {
      // defaultValue: null,
      treeData
    }
  },
  mounted() {
    getTreeData().then(data => {
      this.treeData = data
    })
  },
  methods: {
    change(value) {
      this.$emit('func', value)
      this.$emit('input', value)
    }
  },
  watch: {
    // value(value) {
    //   console.log('--', value)
    //   if (value) {
    //     this.defaultValue = value
    //   }
    // }
  },
  props: {
    // defaultValue: {
    //   type: String,
    //   default: 'aef8ed12-6c43-3106-f586-39f524057188'
    // },
    msg: String,
    maxHeight: {
      type: String,
      default: '400px'
    },
    // style:{
    //   type:String,
    //   default:"width:200px"
    // },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>
