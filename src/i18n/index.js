import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from './lan/zh';
import en from './lan/en';
Vue.use(VueI18n); // 全局挂载

export const i18n = new VueI18n({
    locale: 'zh', // 从localStorage中获取 默认中文
    messages: {
        zh: zh, // 中文语言包
        en: en, // 英文语言包
    },
});

export default i18n;
