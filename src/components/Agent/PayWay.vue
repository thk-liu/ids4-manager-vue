<template>
  <a-select
    showSearch
    placeholder="选择货物付款条件"
    optionFilterProp="children"
    style="width: 200px"
    @change="handleChange"
    :value="value"
    :filterOption="filterOption"
  >
    <a-select-option
      v-for="(option,index) in options"
      v-bind:key="index"
      :value="option.id"
    >{{option.name}}</a-select-option>
    <!-- <a-select-option value="lucy">Lucy</a-select-option>
    <a-select-option value="tom">Tom</a-select-option>-->
  </a-select>
</template>

<script>
import { isNullOrUndefined } from 'util'

export default {
  data() {
    return {
      // defaultValue: 1,
      options: [
        { id: 0, name: '款到发货' },
        { id: 1, name: '货到付款' }
      ]
      // options:[{id:1,name:"款到发货"},{id:2,name:"货到付款"},{id:0,name:"其他"}]
    }
  },
  methods: {
    handleChange(value) {
      // this.defaultValue = value
      console.log('handleChange:' + value)
      this.$emit('input', value)
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },
  watch: {},
  props: {
    value: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>
