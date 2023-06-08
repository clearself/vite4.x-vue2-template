<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { toggleClass } from '@/utils';
const ceshi = (keys, content) => {
    if (sessionStorage && sessionStorage[content] != undefined) {
        var jsom = sessionStorage[content];
        if (jsom && jsom != '') {
            var mp = JSON.parse(jsom);
            if (mp[keys] && mp[keys] != '') {
                return mp[keys];
            } else {
                return '';
            }
        }
    } else {
        return '';
    }
};
export default {
    name: 'App',
    data() {
        return {};
    },
    computed: {
        themeSettings() {
            return this.$store.state.settings.themeSettings;
        },
    },
    watch: {
        themeSettings(newData, oldData) {
            console.log('newData', newData);
            if (newData) {
                toggleClass(document.body, 'custom-' + newData);
            }
        },
    },
    beforeCreate() {
        window.addEventListener('load', (e) => {
            let themeSettings = ceshi('root', 'along')?.settings?.themeSettings ?? 'default';
            toggleClass(document.body, 'custom-' + themeSettings);
        });
    },
    created() {
        console.log('created');
        let initInfo = this.$getlocalStorage('initInfo');
        if (initInfo?.theme?.systemName) {
            document.title = initInfo.theme.systemName;
        }
    },
    mounted() {
        console.log(ceshi('root', 'along'));
    },
    methods: {},
};
</script>

<style lang="scss">
html,
body {
    height: 100%;
    padding-right: 0 !important;
}

#app {
    min-width: 900px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
    color: #2c3e50;
    position: relative;

    @include themeify {
        background: themed('page-bg');
    }

    overflow: hidden;
    min-height: 100%;
}</style>
