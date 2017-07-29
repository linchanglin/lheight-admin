import Home from '../views/Home.vue'

import Loves from '../views/pages/loves.vue'
import Comments from '../views/pages/comments.vue'
import Replies from '../views/pages/replies.vue'
import AboutLoveWall from '../views/pages/comments.vue'

let siderBar = [
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-heart',
        leaf: true,//只有一个节点
        children: [
            { path: '/loves', component: Loves, name: '帖子管理' }
        ]
    },

    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-exclamation-circle',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/badReports', component: Loves, name: '举报处理' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            { path: '/users', component: Loves, name: '用户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            { path: '/virtualUsers', component: Loves, name: '虚拟用户管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-male',
        leaf: true,//只有一个节点
        children: [
            { path: '/collegeUsers', component: Loves, name: '墙君管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bell',
        leaf: true,//只有一个节点
        children: [
            { path: '/systemNotices', component: Loves, name: '系统通知' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-rocket',
        leaf: true,//只有一个节点
        children: [
            { path: '/relatedApplets', component: Loves, name: '相关小程序' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/aboutLoveWalls', component: AboutLoveWall, name: '关于校园生活墙' }
        ]
    },
];

export default siderBar;