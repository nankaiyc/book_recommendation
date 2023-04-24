import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 此处路由每个角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '图书推荐系统', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'newbook',
      component: () => import('@/views/newbook/index'),
      meta: { title: '新书速递', icon: 'el-icon-notebook-2' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'tag',
      component: () => import('@/views/tag/index'),
      meta: { title: '图书标签', icon: 'el-icon-collection-tag' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'recommend',
      component: () => import('@/views/recommend/index'),
      meta: { title: '猜你喜欢', icon: 'el-icon-star-off' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'chatbot',
      component: () => import('@/views/chatbot/index'),
      meta: { title: '智能助手', icon: 'el-icon-chat-line-round' }
    }]
  },
]
/**
 * 根据role动态构建路由
 */
export const asyncRoutes = [
  {
    path: '/manage',
    component: Layout,
    name: '系统管理',
    alwaysShow: true,
    hidden:true,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools',
      menu: 'system-manage',
    },
    redirect: '/manage/users',
    children: [
      {
        path: 'users',
        component: () => import('@/views/user/userList'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid', menu: 'user-manage' }
      },
      {
        path: '/user/modify_self',
        component: () => import('@/views/user/editSelf'),
        meta: { title: '修改用户信息' },
        hidden: true
      },
      {
        path: '/user/add',
        component: () => import('@/views/user/userAdd'),
        meta: { title: '新增用户', menu: 'user-add' },
        hidden: true
      },
      {
        path: 'records',
        component: () => import('@/views/record/recordList'),
        meta: { title: '操作记录', icon: 'el-icon-postcard', menu: 'record-manage' }
      }]

  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
