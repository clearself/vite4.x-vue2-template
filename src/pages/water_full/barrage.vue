<template>
    <div class="barrages-drop">
        <vue-baberrage
            :isShow="barrageIsShow"
            :barrageList="barrageList"
            :maxWordCount="maxWordCount"
            :throttleGap="throttleGap"
            :loop="barrageLoop"
            :boxHeight="boxHeight"
            :messageHeight="messageHeight"
        >
        </vue-baberrage>
    </div>
</template>
<script>
import { MESSAGE_TYPE } from 'vue-baberrage';
export default {
    name: 'barragesItem',
    //接收父组件传递过来的数组数据
    props: {
        barrage: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            barrageIsShow: true,
            messageHeight: 50,
            boxHeight: 150,
            barrageLoop: true,
            boxWidth: 800, //弹幕宽度
            maxWordCount: 300,
            throttleGap: 5000, //消息间隔
            barrageList: [],
            barrage1: [],
        };
    },
    //因为父组件那边接口执行会比组件生成慢，所以用watch监听赋值
    watch: {
        barrage(newVal, oldVal) {
            this.barrage1 = newVal;
            this.addToList();
        },
    },
    mounted() {},
    methods: {
        addToList() {
            console.log(this.barrage1);
            this.barrage1.forEach((v) => {
                this.barrageList.push({
                    id: Math.round(Math.random() * 5000),
                    msg: v,
                    time: this.randomNum(3, 10),
                    type: MESSAGE_TYPE.NORMAL,
                    barrageStyle: '',
                });
            });
        },
        // 生成指定随机数，作用于每条弹幕的速度
        randomNum(minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                    break;
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break;
                default:
                    return 0;
                    break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.baberrage-item {
    height: 0.5rem !important;
}
//强行改变弹幕背景色
.baberrage-item .normal {
    background: rgba(0, 0, 0, 0.3) !important;
}
.normal {
    .baberrage-msg {
        /*padding: .1rem!important;*/
    }
    .baberrage-avatar {
        display: none;
    }
    //弹幕前头像不展示
    img {
        display: none;
    }
}
.baberrage-avatar {
    img {
        width: 20px !important;
        height: 20px !important;
    }
}
.barrages-drop {
    width: 100%;
    height: 100%;
    .blue {
        border-radius: 100px;
        background: #e6ff75;
        color: #fff;
    }

    .green {
        border-radius: 100px;
        background: #75ffcd;
        color: #fff;
    }
    .red {
        background: rgba(0, 0, 0, 0.1);
        color: red;
    }
    .yellow {
        border-radius: 100px;
        background: #dfc795;
        color: #fff;
    }
    .baberrage-stage {
        position: absolute;
        width: 100%;
        overflow: hidden;
        top: 0;
    }
}
</style>
