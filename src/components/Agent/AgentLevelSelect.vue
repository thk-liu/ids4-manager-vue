<template>
   <a-select
    showSearch
    :placeholder="$t('page.select')"
    optionFilterProp="children"
    style="width: 200px"
    :multiple="multiple"
    :value="defaultValue"
    @change="handleChange"
    :filterOption="filterOption"
  >
    <a-select-option v-for="option in options" :key="option.index" 
    :value="option.id" >{{option.name}}</a-select-option>
  </a-select>
</template>

<script>
import { isNullOrUndefined } from 'util';
import {getAll} from '@/api/agent/agentLevel'

export default {
   data () {
    return {
      defaultValue:undefined,
      options:[]
    }
  },
  methods:{
    handleChange (value) {
      // console.log(`selected ${value}`);
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
    value:{
      type:String,
      // default:'0445f79d-66ee-7036-9625-39ef16674a00'
    },
    multiple:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

</style>
