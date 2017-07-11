import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import Loves from './views/pages/loves.vue'
import Comments from './views/pages/comments.vue'
import Replies from './views/pages/replies.vue'
import SystemNotices from './views/pages/systemNotices.vue'
import AboutLoveWall from './views/pages/comments.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-heart',
        leaf: true,//只有一个节点
        children: [
            { path: '/loves', component: Loves, name: '表白管理' }
        ]
    },
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '表白管理',
    //     iconCls: 'fa fa-heart',
    //     children: [
    //         { path: '/newLoves', component: Loves, name: '最新' },
    //         { path: '/hotLoves', component: Loves, name: '热门' },
    //         { path: '/imageLoves', component: Loves, name: '图片' },
    //         { path: '/videoLoves', component: Loves, name: '视频' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-comment',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/comments', component: Table, name: '评论管理' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-comment',
        leaf: true,//只有一个节点
        children: [
            { path: '/loves/:id/comments', component: Comments, name: '评论管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-comments-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/comments/:id/replies', component: Replies, name: '回复管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bell',
        leaf: true,//只有一个节点
        children: [
            { path: '/systemNotices', component: SystemNotices, name: '系统通知' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-exclamation-circle',
        leaf: true,//只有一个节点
        children: [
            { path: '/badReports', component: Table, name: '举报处理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            { path: '/users', component: Table, name: '用户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/aboutLoveWall', component: AboutLoveWall, name: '关于表白墙' }
        ]
    },


    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;