// 帮助手册
import help from './help';
const Layout = () => import('@/layout');
const errorPage = () => import('@/pages/common/Error.vue');
const NoPer = () => import('@/pages/common/NoPer.vue');
const help_manual = () => import('@/pages/help_manual');
const commandDrill = () => import('@/pages/defense_drill/commandDrill.vue');

const water = () => import('@/pages/water_full/index.vue');
const barrage = () => import('@/pages/water_full/barrage_index.vue');

export default [
    {
        path: '/barrage',
        name: 'barrageWrapper',
        component: barrage,
        meta: {
            title: '弹幕',
        },
    },
    {
        path: '/water',
        name: 'water',
        component: water,
        meta: {
            title: '瀑布流',
        },
    },
    {
        path: '/layout',
        name: 'layout',
        component: Layout,
        meta: {
            title: '',
        },
    },
    {
        path: '/commandDrill',
        name: 'commandDrill',
        component: commandDrill,
        meta: {
            title: '演练态势',
        },
    },
    {
        path: '/error',
        name: 'error',
        component: errorPage,
        meta: {
            title: '系统出错了',
        },
    },
    {
        path: '/help_manual',
        name: 'help_manual',
        component: help_manual,
        children: [...help],
    },
    {
        path: '/inner',
        name: 'inner',
        component: Layout,
        children: [
            {
                path: 'no_per',
                name: 'no_per',
                component: NoPer,
                meta: {
                    title: '无权限',
                },
            },
        ],
    },
];
