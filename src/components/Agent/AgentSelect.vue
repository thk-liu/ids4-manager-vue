<template>
  <a-modal :visible="visible" title="选择客户" @ok="ok" @cancel="hide" :width="700" style="top:40px;">
    <a-row>
      <a-col :span="24">
        <a-row>
          <a-col :span="20">
            <a-input-search placeholder="商品编码/名称" @search="onSearch" v-model="query.key" enterButton />
          </a-col>
        </a-row>
        <a-row style="margin-top:10px">
          <a-col :span="24">
            <s-table ref="table" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,type:multiple == true?'checkbox':'radio'}" row-key="id" :columns="columns" size="small" :data="loadData"></s-table>
          </a-col>
        </a-row>
      </a-col>
      <!-- <a-col :span="8">商品sku</a-col> -->
    </a-row>
  </a-modal>
</template>

<script>
import { getTreeData } from "@/api/product/productClass";
import { STable } from "@/components";
import * as agent from '@/api/agent/agentList'
import linq from 'linq'

export default {
  data() {
    return {
      visible: false,
      productClass: [],
      selectedRows:[],
      selectedRowKeys:[],
      columns: [
         {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title:this.$t('table.code'),
    dataIndex: "code",
    key: "code"
  },
  {
    title: "分类",
    dataIndex: "category",
    key: "category"
  },
  {
    title: "区域",
    dataIndex: "area",
    key: "area"
  },
  {
    title: "级别",
    dataIndex: "level",
    key: "level"
  },
  {
    title: "行业",
    dataIndex: "industry",
    key: "industry"
  },
      ],
      query:{
          agentAreaId:undefined,
          agentCategoryId:undefined,
          agentIndustryId:undefined,
          AgentLevelId:undefined,
          key:"",
          state:"全部",
          maxResultCount:10,
          skipCount:0
      },
      loadData: parameter => {
       return agent.getAll(Object.assign(this.query,parameter)).then(res => {
          return res;
        });
      }
    };
  },
  props:{
    multiple:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    show() {
      this.visible = true;
      this.selectedRowKeys=[];
    },
    ok() {
      this.visible = false;
      this.$emit("selectedRow",this.selectedRows)
    },
    hide() {
      this.visible = false;
    },
    onSearch(){
         this.$refs.table.refresh();
    },
    selectChange(data){
         this.query.state = data;
         this.onSearch();
    },
    productClassSelect(e){
        if(e){
             this.query.productClassId = linq.from(e).firstOrDefault();
             this.onSearch();
        }
    },
    onSelectChange (selectedRowKeys,selectedRows) {
    //   this.selectedRows=[];
    //   this.selectedRowKeys=[];

      this.selectedRows=selectedRows;
      this.selectedRowKeys = selectedRowKeys
    }
  },
  mounted() {
    console.log("show")
    //初始化
    getTreeData().then(data => {
      this.productClass = data;
    });
  },
  components: {
    STable
  },
  computed: {
    
  },
};
</script>

<style>
</style>