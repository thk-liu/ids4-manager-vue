<template>
  <a-card>
    <a-form>
      <a-form-item :label="$t('notice.title')">
        <a-input v-model="model.title"></a-input>
      </a-form-item>
      <a-form-item :label="$t('notice.shortDescription')">
        <a-input v-model="model.shortDescription"></a-input>
      </a-form-item>
    </a-form>
    <!-- 隐藏的input -->
    <!-- <input type="file" hidden accept=".jpg, .png" ref="fileBtn" @change="imgHandleChange" />
    <h4>{{$t('productDetail.productAtlas')}}</h4>

    <div class="clearfix">
      <a-upload
        accept="image/*"
        :customRequest="customRequest"
        listType="picture-card"
        :fileList="fileList"
        @preview="handlePreview"
        @change="handleChange"
        :remove="remove"
      >
        <div v-if="fileList.length < 5">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>-->

    <div class="edit_container">
      <h4>{{ $t('notice.content') }}</h4>
      <quill-editor
        v-model="model.content"
        ref="myQuillEditor"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>

    <div style="text-align: center; margin-top: 12px">
      <a-button type="primary" style="width: 100px" @click="save">{{ $t('page.save') }}</a-button>
    </div>
  </a-card>
</template>

<script>
import { quillEditor, Quill } from 'vue-quill-editor' //调用编辑器
// import { upload, saveProductImage } from '@/api/fileService'
// Quill.register('modules/ImageExtend', ImageExtend)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import { saveProductDetail, getProductDetail, getProductImage } from '@/api/product/product'

// import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import productManagerStore from '@/store/productManager'
import Axios from 'axios'
import server from '@/utils/server'
import Vue from 'vue'
import linq from 'linq'
import { get, update, add } from '@/api/agent/notice'

export default {
  data() {
    return {
      model: {
        title: '',
        shortDescription: '',
        content: '',
      },
      previewVisible: false,
      previewImage: '',
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // }
      ],
    }
  },
  mounted() {
    let id = this.$route.query.id
    if (id) {
      get(id).then((res) => {
        this.model = res
      })
    }
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    //自定义图片上传
    imgHandler(state) {
      if (state) {
        //触发input的单击 ，fileBtn换成自己的
        this.$refs.fileBtn.click()
      }
    },
    imgHandleChange(e) {
      const files = Array.prototype.slice.call(e.target.files)
      if (!files) {
        return
      }
      // upload(files[0]).then(url => {
      //   //这里设置为空是为了联系上传同张图可以触发change事件
      //   this.$refs.fileBtn.value = ''
      //   let selection = this.$refs.myQuillEditor.quill.getSelection()
      //   //这里就是返回的图片地址，如果接口返回的不是可以访问的地址，要自己拼接
      //   // let imgUrl = responseData.imageUrl
      //   //获取quill的光标，插入图片
      //   this.$refs.myQuillEditor.quill.insertEmbed(selection != null ? selection.index : 0, 'image', url)
      //   //插入完成后，光标往后移动一位
      //   this.$refs.myQuillEditor.quill.setSelection(selection.index + 1)
      // })
      // let form = new FormData()
      // form.append('file', files[0])
      // //使用了axios请求
      // axios({
      //   url: 自己的服务接口,
      //   method: 'post',
      //   data: form,
      //   headers: { 'Content-Type': undefined },
      //   withCredentials: true
      // }).then(({ data: { responseData } }) => {
      //   //这里设置为空是为了联系上传同张图可以触发change事件
      //   this.$refs.fileBtn.value = ''
      //   if (responseData.uploadSuccess) {
      //     let selection = this.$refs.myQuillEditor.quill.getSelection()
      //     //这里就是返回的图片地址，如果接口返回的不是可以访问的地址，要自己拼接
      //     let imgUrl = responseData.imageUrl
      //     //获取quill的光标，插入图片
      //     this.$refs.myQuillEditor.quill.insertEmbed(selection != null ? selection.index : 0, 'image', imgUrl)
      //     //插入完成后，光标往后移动一位
      //     this.$refs.myQuillEditor.quill.setSelection(selection.index + 1)
      //   }
      // })
    },
    //
    customRequest(event) {
      // const formData = new FormData();
      // formData.append("file", event.file);

      // console.log(event);

      // upload(formData).then(data => {
      //   event.onSuccess(data);
      // });
      upload(event.file).then((data) => {
        event.onSuccess(data)
      })
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    remove(file) {
      //TODO:确定删除吗 删除后无法恢复
      // return false;
      console.log(file)
    },
    save() {
      console.log(this.fileList)
      var files = []
      this.fileList.forEach((element) => {
        if (element.response) {
          //新上传的文件
          files.push(element.response)
        } else {
          files.push(element)
        }
      })
      const scope = this
      console.log(this.content)

      if (this.model.content && this.model.content.status == 204) {
        this.$error({ title: '无效的内容', content: '详情内容还是添加点内容吧~' })
        return
      } else {
        if (this.model.id) {
          update(this.model).then((res) => {
            scope.$message.success('修改成功')
          })
        } else {
          add(this.model).then((res) => {
            scope.$message.success('保存成功')
            this.$router.back()
          })
        }
      }
      //同时请求会发生并发问题 拦截器无法正常修改值
      // Axios.all([saveProductDetail(this.productId, this.content), saveProductImage(this.productId, files)]).then(
      //   Axios.spread(function(detail, iamge) {
      //     scope.$message.success('保存成功')
      //   })
      // )
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    productId() {
      return productManagerStore.state.productId
    },
  },
  components: {
    quillEditor,
  },
}
</script>
<style>
.ql-editor {
  height: 400px;
}
</style>

<style scoped>
/* .edit_container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    } */

h4 {
  font-size: 12px;
  color: #333;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
  /* padding-left: 10px; */
}
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.m-l-10 {
  margin-left: 10px;
}

.m-t-10 {
  margin-top: 10px;
}
</style>

