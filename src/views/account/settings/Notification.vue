<template>
  <a-list itemLayout="horizontal" :loading="loading" :dataSource="data">
    <div
      v-if="showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" />
      <a-button v-else @click="onLoadMore">loading more</a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item, index">
      <!-- <a slot="actions">{{item.creationTime}}</a> -->
      <a slot="actions" @click="openLink(item.notificationName,item.refId,item.id)">more</a>
      <a-list-item-meta :description="item.message">
        <a slot="title" href="https://www.antdv.com/">{{item.title}}</a>
        <!-- <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />-->
      </a-list-item-meta>
      <div>{{item.creationTime}}</div>
    </a-list-item>
    <!-- <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </a-list-item>-->
  </a-list>
</template>

<script>
import { GetLists } from '@/api/tenantNotification'

export default {
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      isLast: false,
      data: [],
      query: {
        skipCount: 0,
        maxResultCount: 10
      }
    }
  },
  mounted() {
    GetLists(this.query).then(res => {
      if (res.items.length < this.query.maxResultCount) {
        // this.showLoadingMore = false
        // this.$forceUpdate()
        this.$set(this, 'showLoadingMore', false)
      }
      this.loading = false
      this.data = res.items
      console.log(this.showLoadingMore)
    })
  },
  methods: {
    openLink(name,refId,id){
      let link =undefined;
      if(name=='order'){
        link=this.$router.resolve({name: 'orderDetail',query: {id: refId }});
      }
      window.open(link.href,'_blank')
      SetReader(id).then(res=>{})
    },
    onLoadMore() {
      if (this.showLoadingMore == false) return
      this.loadingMore = true
      this.query.skipCount += this.query.maxResultCount
      GetLists(this.query).then(res => {
        this.loadingMore = false
        if (res.items.length < this.query.maxResultCount) {
          this.$set(this, 'showLoadingMore', false)
        }
        this.data = this.data.concat(res.items)

        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
