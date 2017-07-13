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
import Users from './views/pages/users.vue'
import CollegeUsers from './views/pages/collegeUsers.vue'
import SystemNotices from './views/pages/systemNotices.vue'
import RelatedApplets from './views/pages/relatedApplets.vue'
import AboutLoveWalls from './views/pages/aboutLoveWalls.vue'

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
            { path: '/users', component: Users, name: '用户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-university',
        leaf: true,//只有一个节点
        children: [
            { path: '/collegeUsers', component: CollegeUsers, name: '学校用户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            { path: '/relatedApplets', component: RelatedApplets, name: '相关小程序' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/aboutLoveWalls', component: AboutLoveWalls, name: '关于表白墙' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;