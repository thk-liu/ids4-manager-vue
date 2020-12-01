<template>
  <a-card>
    <a-row :gutter="48">
      <!-- <a-col :md="12" :sm="24">
          类别：
          <a-checkable-tag
            v-for="item in CustomTypes"
            :checked="item.code == detail.authorizedAgentType"
            @change="customTypesChange($event, item)"
            :key="item.id"
          >{{ item.name }}</a-checkable-tag>
      </a-col>-->
      <!-- <a-col offset="20"> -->

      <div style="float: right; margin-right: 20px">
        <router-link :to="{ name: 'noticeDetail' }">
          <a-button type="primary">{{ $t('notice.addNew') }}</a-button>
        </router-link>
      </div>
      <!-- </a-col> -->
    </a-row>
    <a-divider></a-divider>
    <!-- <a-row>
        <a-col :span="4">
          消息类别
          <a-tree :treeData="productClass" @select="productClassSelect"></a-tree>
        </a-col>
    <a-col :span="20">-->
    <s-table ref="table" row-key="id" :columns="columns" size="small" :data="loadData">
      <template slot="action" slot-scope="text, record, index">
        <router-link :to="{ name: 'noticeDetail', query: { id: record.id } }">{{ $t('table.edit') }}</router-link>
        <a-divider type="vertical" />

        <a-popconfirm :title="$t('page.deleteTips')" @confirm="del(record, index)">
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <a>{{ $t('table.delete') }}</a>
        </a-popconfirm>
      </template>
    </s-table>
  </a-card>
</template>

<script>
import { STable } from '@/components'
// import * as product from '@/api/product/product'
import { getAll, del } from '@/api/agent/notice'

import { mixin, mixinDevice } from '@/utils/mixin'
import FooterToolBar from '@/components/FooterToolbar'
import { from } from 'linq'

export default {
  mixins: [mixin, mixinDevice],
  data() {
    return {
      loading: false,
      isEdit: true,
      CustomTypes: [
        {
          id: 1,
          code: '系统公告',
          name: '系统公告',
        },
        {
          id: 2,
          code: '促销通知',
          name: '促销通知',
        },
        {
          id: 3,
          code: '客户分类',
          name: '客户分类',
        },
        {
          id: 4,
          code: '客户级别',
          name: '客户级别',
        },
        {
          id: 5,
          code: '客户行业',
          name: '客户行业',
        },
      ],
      detail: {
        authorizedAgentType: '客户',
        refId: undefined,
        refDescription: undefined,
        items: [],
      },
      productClass: [],
      query: {
        key: '',
        maxResultCount: 10,
        skipCount: 0,
      },
      loadData: (parameter) => {
        return getAll(Object.assign(this.query, parameter))
      },
      selectedRows: [],
      selectedRowKeys: [],
      columns: [
        {
          title: this.$t('notice.title'),
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: this.$t('notice.shortDescription'),
          dataIndex: 'shortDescription',
          key: 'shortDescription',
        },
        {
          title: this.$t('notice.time'),
          dataIndex: 'creationTime',
          width: '140px',
          align: 'center',
          key: 'creationTime',
        },
        {
          title: this.$t('table.action'),
          align: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    onSearch() {
      this.$refs.table.refresh()
    },
    del(record) {
      del(record.id).then((result) => {
        this.$message.success()
        this.$refs.table.refresh()
      })
    },
  },

  mounted() {},
  components: {
    FooterToolBar,
    STable,
  },
}
</script>
