<template>
    <div class="danmus-wrapper">
        <danmu v-model="danmus" :channels="channels" :autoplay="autoplay" :loop="loop" :fontSize="fontSize"
            :extraStyle="extraStyle" :speeds="speeds" :top="top" :right="right" :isSuspend="isSuspend"
            style="width: 100%; height: 100%"></danmu>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Danmu from './danmu';
export default {
    components: {
        Danmu,
    },
    data() {
        return {
            // 通道数
            channels: 2,
            // 是否自动播放
            autoplay: true,
            // 是否循环播放
            loop: true,
            //字体大小设置
            fontSize: 16,
            //速度大小设置
            speeds: 80,
            top: 20,
            right: 50,
            isSuspend: false,
            // 额外添加样式
            extraStyle: 'color:#000;font-size:red;',
            // 弹幕数据源
            danmus: [
                '哈哈哈哈啊哈哈哈哈哈1',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈2',
                '哈哈哈哈啊哈哈哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈3',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈4',
                '哈哈哈哈啊哈哈哈哈哈5',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈6',
                '哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈7',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈8',
                '哈哈哈哈啊哈哈哈哈哈9',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈10',
                '哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈11',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈12',
                '哈哈哈哈啊哈哈哈哈哈13',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈14',
                '哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈16',
                '哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈15',
            ],
            list: [],
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },
    methods: {
        init() {
            setTimeout(() => {
                for (let i = 0; i < 100; i++) {
                    this.list.push({
                        id: uuidv4(),
                        type: Math.floor(Math.random() * 2),
                        num: Math.floor(Math.random() * 300),
                    });
                }
            }, 1000);
        },
    },
};
</script>
<style lang="scss" scoped>
.echart-box {
    width: 500px;
    height: 500px;
    position: relative;
}

.danmus-wrapper {
    width: 300px;
    height: 400px;
    margin: 30px auto;
    border: 1px solid red;
}

.danmu-extra {
    color: #000;
}
</style>
