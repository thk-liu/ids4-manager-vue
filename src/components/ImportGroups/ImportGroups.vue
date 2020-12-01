<template>
  <div style="display: inline;">
    <a-dropdown v-if="showImport()">
      <a-menu slot="overlay">
        <a-menu-item key="1" @click="excelImport" v-if="typeof(this.excel)==='function'">
          <a-upload
            style="display: inline-flex;"
            accept=".xls, .xlsx"
            :showUploadList="false"
            :customRequest="excelImport"
          >
            <a-icon type="upload"></a-icon>Excel导入
          </a-upload>
        </a-menu-item>
        <a-menu-item key="2" v-if="templateUrl">
          <a :href="'/import_template/'+templateUrl" target="blank">
            <a-icon type="vertical-align-bottom" />导入模板下载
            <!-- <a-icon type=""></a-icon> -->
          </a>
        </a-menu-item>
      </a-menu>

      <a-button style="margin-left: 8px">
        <a-icon type="upload"></a-icon>
        {{$t('page.import')}}
      </a-button>
    </a-dropdown>
    <!-- <a-button type="default">
      <a-icon type="upload"></a-icon>
      {{$t('page.import')}}
    </a-button>-->
    <a-divider type="vertical" v-if="showImport()" />
    <a-button type="default">
      <a-icon type="export"></a-icon>
      {{$t('page.export')}}
    </a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    excel: {
      type: Function
    },
    templateUrl: {
      type: String
    }
  },
  methods: {
    showImport() {
      return typeof this.excel === 'function' || this.templateUrl
    },
    customRequest(event) {
      const formData = new FormData()
      formData.append('file', event.file)

      stockManager.importFile(formData).then(data => {
        this.$message.success({
          title: '导入成功',
          // JSX support
          content: (
            <div>
              <p>some messages 导入结果 some messages...</p>
              <p>some messages 导入结果 some messages...</p>
            </div>
          )
        })
        event.onSuccess(data)
      })
    },
    excelImport(event) {
      if (!event.file) {
        return
      }

      const formData = new FormData()
      formData.append('file', event.file)
      var tt = { '编码:001': '成功', '编码:001001': '成功', '编码:001001001': '成功', '编码:001001002': '成功' }
      this.excel(formData).then(data => {
        console.log(data)
        this.$success({
          title: '导入成功',
          // JSX support
          content: (
            <div>
              <h4>以下是异常信息</h4>
              <p>some messages 导入结果 some messages...</p>
            </div>
          )
        })
        event.onSuccess(data)
      })
    }
  }
}
</script>
<style scoped>
</style>