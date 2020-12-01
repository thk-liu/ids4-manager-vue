import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    // console.log('permission', permission.length);
    // return false;
    flag = permission[route.meta.permission];
    if (flag) {
      return true;
    }
    return false;
    for (let i = 0, len = permission.length; i < len; i++) {
      var tt = permission[i];
      if (!tt) {
        return false;
      }
      debugger
      console.log(Object.keys(tt))
      flag = route.meta.permission.includes(Object.keys(tt))
      if (flag) {
        // console.log("找到权限了",route.meta.permission);
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    // if (hasPermission(roles.permissionList, route)) {
    //   if (route.children && route.children.length) {
    //     route.children = filterAsyncRouter(route.children, roles)
    //   }
    //   return true
    // }
    // console.log('roles', roles)
    // debugger
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  // console.log('accessedRouters', accessedRouters)
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        // console.log('GenerateRoutes', roles)
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // console.log('accessedRouters', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
