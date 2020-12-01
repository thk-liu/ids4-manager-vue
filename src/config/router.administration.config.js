import { UserLayout, BasicLayout, RouteView, PageView } from '@/layouts'
import { tool } from '@/core/icons'
export default {
    path: '/administration ',
    name: 'administration',
    component: RouteView,
    meta: { title: 'Administration', keepAlive: true, icon: "tool" },
    children: [
        {
            name: 'saas',
            path: '/administration/saas',
            component: PageView,
            redirect: '/administration/saas/tenants',
            meta: { title: 'Saas', keepAlive: true },
            children: [{
                path: '/administration/saas/tenants',
                name: 'tenants',
                component: () =>
                    import('@/views/administration/saas/tenants'),
                meta: { title: '租户', keepAlive: true, permission: ['AbpTenantManagement.Tenants'] }
            }, {
                path: '/administration/saas/editions',
                name: 'editions',
                component: () =>
                    import('@/views/administration/saas/editions'),
                meta: { title: '版本', keepAlive: true, permission: ['SaasManagement.Edition'] }
            }]
        }, {
            name: 'identity ',
            component: PageView,
            path: '/administration/identity',
            redirect: '/administration/identity/roles',
            meta: { title: '身份管理', keepAlive: true },
            children: [{
                path: '/administration/identity/roles',
                name: 'roles',
                component: () =>
                    import('@/views/administration/identity/roles'),
                meta: { title: '角色', keepAlive: true }
            }, {
                path: '/administration/identity/users',
                name: 'users',
                component: () =>
                    import('@/views/administration/identity/users'),
                meta: { title: '用户', keepAlive: true }
            },
            {
                path: '/administration/identity/claim-types',
                name: 'claim-types',
                component: () =>
                    import('@/views/administration/identity/claim-types'),
                meta: { title: '声明类型', keepAlive: true }
            }
            ]
        },
        {
            name: 'identity-server',
            meta: { title: '身份服务', keepAlive: true },
            component: PageView,
            path: '/administration/identity-server',
            redirect: '/administration/identity-server/clients',
            children: [{
                path: '/administration/identity-server/clients',
                name: 'clients',
                component: () =>
                    import('@/views/administration/identity-server/clients'),
                meta: { title: '客户端', keepAlive: true, permission: ['IdentityServer.Client'] }
            },
            {
                path: '/administration/identity-server/client-detail',
                name: 'client-details',
                hidden: true,
                component: () =>
                    import('@/views/administration/identity-server/client-detail'),
                meta: { title: '客户端详情', keepAlive: true }
            },
            {
                path: '/administration/identity-server/identity-resources',
                name: 'identity-resources',
                component: () =>
                    import('@/views/administration/identity-server/identity-resources'),
                meta: { title: '身份资源', keepAlive: true, permission: ['IdentityServer.IdentityResource'] }
            },
            {
                path: '/administration/identity-server/api-resources',
                name: 'api-resources',
                component: () =>
                    import('@/views/administration/identity-server/api-resources'),
                meta: { title: 'APi资源', keepAlive: true, permission: ['IdentityServer.ApiResource'] }
            }
            ]
        },
        {
            name: 'language-management',
            component: PageView,
            meta: { title: '多语言', keepAlive: true },
            path: '/administration/language-management',
            redirect: '/administration/language-management/languages',
            children: [{
                path: '/administration/language-management/languages',
                name: 'languages',
                component: () => import('@/views/account/center/Index'),
                meta: { title: '语言列表', keepAlive: true }
            }, {
                path: '/administration/language-management/texts',
                name: 'language-texts',
                component: () => import('@/views/account/center/Index'),
                meta: { title: '语言文本', keepAlive: true }
            }]
        },
        {
            name: 'audit-logs',
            path: '/administration/audit-logs',
            component: () =>
                import('@/views/administration/audit-logs'),
            meta: { title: '审计日志', keepAlive: true }
        },
        {
            name: 'setting-management',
            path: '/administration/setting-management',
            component: () =>
                import('@/views/administration/setting-management'),
            meta: { title: '设置管理', keepAlive: true }
        }
    ]
}