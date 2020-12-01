<template>
   <a-select
    showSearch
    :placeholder="$t('page.select')"
    optionFilterProp="children"
    style="width: 200px"
    :value="defaultValue"
    @change="handleChange"
    :filterOption="filterOption"
  >
    <a-select-option v-for="(option,index) in options" v-bind:key="index" :value="option.id" >{{option.name}}</a-select-option>
    <!-- <a-select-option value="lucy">Lucy</a-select-option>
    <a-select-option value="tom">Tom</a-select-option> -->
  </a-select>
</template>

<script>
import { isNullOrUndefined } from 'util';
import {getAll} from '@/api/agent/agentIndustry'

export default {
   data () {
    return {
      defaultValue:undefined,
      options:[]
    }
  },
  methods:{
    handleChange (value) {
      this.defaultValue=value;
      this.$emit('func',value)
    },
    // handleBlur() {
    //   console.log('blur');
    // },
    // handleFocus() {
    //   console.log('focus');
    // },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },
  mounted(){
      getAll().then((data)=>{
          this.options=data.items;
      })
  },
  watch:{
      value(value){
        if(!isNullOrUndefined(value)){
          console.log(value)
            this.defaultValue=value;
        }
       
      }
  },
  props: {
    value:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

</style>
