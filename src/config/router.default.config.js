import { UserLayout, BasicLayout, RouteView, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'
import router_administration from './router.administration.config'

export const asyncRouterMap = [{
  path: '/',
  name: 'index',
  component: BasicLayout,
  meta: { title: 'Home' },
  // permission:['AbpIdentity.Roles'],
  redirect: '/dashboard/analysis',
  children: [
    //   dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/analysis',
      component: RouteView,
      // hidden:true,
      meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse },
      children: [{
        path: '/dashboard/analysis',
        name: 'Analysis',
        component: (resolve) => require(['@/views/dashboard/Analysis'], resolve),
        meta: { title: '分析页', keepAlive: false, }
      }]
    },

    {
      path: '/result',
      name: 'result',
      component: PageView,
      hidden: true,
      redirect: '/result/success',
      meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
      children: [{
        path: '/result/success',
        name: 'ResultSuccess',
        component: () =>
          import( /* webpackChunkName: "result" */ '@/views/result/Success'),
        meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      },
      {
        path: '/result/fail',
        name: 'ResultFail',
        component: () =>
          import( /* webpackChunkName: "result" */ '@/views/result/Error'),
        meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
      }
      ]
    },

    // Exception
    {
      path: '/exception',
      name: 'exception',
      component: RouteView,
      redirect: '/exception/403',
      meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
      children: [{
        path: '/exception/403',
        name: 'Exception403',
        component: () =>
          import( /* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', permission: ['exception'] }
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () =>
          import( /* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', permission: ['exception'] }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () =>
          import( /* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', permission: ['exception'] }
      }
      ]
    },

    // account
    {
      path: '/account',
      component: RouteView,
      redirect: '/account/center',
      hidden: true,
      name: 'account',
      hidden: true,
      meta: { title: '个人页', icon: 'user', keepAlive: true, },
      children: [{
        path: '/account/center',
        name: 'center',
        component: () =>
          import('@/views/account/center/Index'),
        meta: { title: '个人中心', keepAlive: true }
      },
      {
        path: '/account/settings',
        name: 'settings',
        component: () =>
          import('@/views/account/settings/Index'),
        meta: { title: '个人设置', hideHeader: true },
        redirect: '/account/settings/base',
        hideChildrenInMenu: true,
        children: [{
          path: '/account/settings/base',
          name: 'BaseSettings',
          component: () =>
            import('@/views/account/settings/BaseSetting'),
          meta: { title: '基本设置', hidden: true }
        },
        {
          path: '/account/settings/security',
          name: 'SecuritySettings',
          component: () =>
            import('@/views/account/settings/Security'),
          meta: { title: '安全设置', hidden: true, keepAlive: true }
        },
        {
          path: '/account/settings/custom',
          name: 'CustomSettings',
          component: () =>
            import('@/views/account/settings/Custom'),
          meta: { title: '个性化设置', hidden: true, keepAlive: true }
        },
        {
          path: '/account/settings/binding',
          name: 'BindingSettings',
          component: () =>
            import('@/views/account/settings/Binding'),
          meta: { title: '账户绑定', hidden: true, keepAlive: true }
        },
        {
          path: '/account/settings/notification',
          name: 'NotificationSettings',
          component: () =>
            import('@/views/account/settings/Notification'),
          meta: { title: '新消息通知', hidden: true, keepAlive: true }
        }
        ]
      }
      ]
    },
    router_administration,
    //Tenant
    // {
    //   path: '/tenancy',
    //   name: 'tenancy',
    //   component: PageView,
    //   redirect: '/tenancy/list',
    //   meta: { title: '租户', icon: 'warning', permission: ['AbpTenantManagement.Tenants'] },
    //   children: [
    //     {
    //       path: '/tenancy/list',
    //       name: 'tenancyList',
    //       component: () => import('@/views/tenancy/TenancyList'),
    //       meta: { title: '租户管理' }
    //     }
    //   ]
    // },


    {
      path: '/auth',
      name: 'auth',
      component: PageView, // PageView,
      redirect: '/auth/agentProductAuth',
      meta: { title: '权限', icon: 'safety', /*permission: ['AbpIdentity.Roles']*/ },
      children: [{
        path: '/corp/roleList',
        name: 'roleList',
        // component: PageView,
        component: () =>
          import( /* webpackChunkName: "auth" */ '@/views/role/RoleList.vue'),
        meta: { title: '角色权限', permission: ['AbpIdentity.Roles'] }
      },

      ],
    }, {
      path: '/notice',
      name: 'notices',
      component: PageView, // PageView,
      redirect: '/notice/notices',
      meta: { title: '公告/消息', icon: 'notification', },
      children: [{
        path: '/notice/notices',
        name: 'notices',
        component: () =>
          import('@/views/notice/notices.vue'),
        meta: { title: '公告/消息' },

      }, {
        path: '/notice/noticeDetail',
        name: 'noticeDetail',
        hidden: true,
        component: () =>
          import('@/views/notice/noticeDetail.vue'),
        meta: { title: '消息详情', },
      }],
    },
    // {
    //   path: '/lease',
    //   name: 'lease',
    //   component: PageView,// PageView,
    //   redirect: '/lease/imageAuth',
    //   meta: { title: '租赁', icon: 'profile', },
    //   children: [
    //     {
    //       path: '/lease/imageAuth',
    //       name: 'imageAuth',
    //       component: () => import('@/views/lease/ImageAuth.vue'),
    //       meta: { title: '图像审核', }
    //     },
    //   ],
    // },
  ]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/user',
  component: UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [{
    path: 'login',
    name: 'login',
    component: () =>
      import( /* webpackChunkName: "login" */ '@/views/user/Login')
    // component: () => import(/* webpackChunkName: "about" */ '@/views/account/Login.vue'),
  },
  {
    path: 'register',
    name: 'register',
    component: () =>
      import( /* webpackChunkName: "register" */ '@/views/user/Register')
  },
  {
    path: 'register-result',
    name: 'registerResult',
    component: () =>
      import( /* webpackChunkName: "registerResult" */ '@/views/user/RegisterResult')
  }
  ]
},
// {
//   path: '/test',
//   component: BlankLayout,
//   redirect: '/test/home',
//   children: [
//     {
//       path: 'home',
//       name: 'TestHome',
//       component: () => import('@/views/Home')
//     }
//   ]
// },
// {
//   path: '/test',
//   component: BlankLayout,
//   redirect: '/test/home',
//   children: [
//     {
//       path: 'home',
//       name: 'TestHome',
//       component: () => import('@/views/Home')
//     }
//   ]
// },
{
  path: '/404',
  component: () =>
    import( /* webpackChunkName: "fail" */ '@/views/exception/404')
},
]