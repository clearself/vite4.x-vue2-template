const login = () => import('@/pages/login/index.vue')
const register = () => import('@/pages/retrieve_password/index.vue')
export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/retrieve_password',
        name: 'register',
        component: register,
        meta: {
            title: '重置密码'
        }
    }
]
