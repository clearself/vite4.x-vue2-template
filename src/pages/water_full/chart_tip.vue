<template>
    <div class="echart-tip" :style="styleObj" @click.stop>
        <el-button type="text" @click="selectVal">选择一</el-button>
        <el-button type="text">选择二</el-button>
    </div>
</template>

<script>
export default {
    name: 'EchartTip',
    props: {
        styleObj: {
            type: Object,
            default: () => {},
        },
        curData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    methods: {
        selectVal() {
            console.log(this.curData, 'curData');
        },
    },
};
</script>
<style lang="scss" scoped>
.echart-tip {
    width: 0px;
    height: 0px;
    line-height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    text-align: center;
    z-index: 9999999;
    opacity: 0;
    transform-origin: center;
    transform: translateZ(-50px);
    transform-style: preserve-3d;
    animation: fadeIn 0.3s ease-in-out forwards;
}
@keyframes fadeIn {
    0% {
        width: 0px;
        height: 0px;
        opacity: 0;
        transform: translateZ(-50px);
    }
    100% {
        width: 120px;
        height: 50px;
        opacity: 1;
        transform: translateZ(0px);
    }
}
</style>
