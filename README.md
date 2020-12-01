# ids4-manager-vue

#### 基于 vue 的 ids4 管理,可作为 abp 前后端分离直接使用并开发

#### 欢迎大家参与维护，作者本人技术栈转为 react 了将之前版本开源出来给大家

> 项目框架是基于 vue antd
> 使用方法 在 src/utils/server 里面配置对应的登录地址与应用程序网关

```js
const FileServerUrl = 'http://localhost:65115'
const AuthUrlApi = 'http://localhost:64999'
const BaseUrlApi = 'http://localhost:65115'
```

> 运行方法

- 运行命令 yarn 安装依赖包
- 运行 yarn serve 即可运行

> 如果发现登录不成功在 src/login.js 内配置好自己的认证信息

```js
export function tenantLogin(parameter) {
  let formData = new FormData()
  formData.append('grant_type', 'password')
  // 这里配置作用域
  formData.append('scope', 'BackendAdminAppGateway OrderService ProductService PriceService AgentService CorpService')
  formData.append('username', parameter.username)
  formData.append('password', parameter.password)
  // 这里配置client
  formData.append('client_id', 'authserver')
  formData.append('client_secret', '1q2w3e*')

  return axios.post('/connect/token', formData, {
    baseURL: server.AuthUrlApi,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
```
