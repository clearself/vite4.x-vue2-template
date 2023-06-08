<template>
    <div ref="myEcharts" class="echarts" @click.stop></div>
</template>

<script>
import echarts from 'echarts';
import ChartTip from './chart_tip';
function getStyle(obj, sAttr) {
    return obj.currentStyle ? parseFloat(obj.currentStyle[sAttr]) : parseFloat(getComputedStyle(obj)[sAttr]);
}
function getOffset(obj) {
    var iLeft = 0;
    var iTop = 0;
    //刚调用此函数，保存一下当前元素的左边框宽度和上边框宽度
    var bL = parseInt(getStyle(obj, 'borderLeftWidth'));
    var bT = parseInt(getStyle(obj, 'borderLeftWidth'));
    bL = isNaN(bL) ? 0 : bL;
    bT = isNaN(bT) ? 0 : bT;
    while (obj) {
        //obj左边的边框width
        var borderL = parseInt(getStyle(obj, 'borderLeftWidth'));
        borderL = isNaN(borderL) ? 0 : borderL;
        //obj顶部的边框width
        var borderT = parseInt(getStyle(obj, 'borderTopWidth'));
        borderT = isNaN(borderT) ? 0 : borderT;

        iLeft += obj.offsetLeft + borderL;
        iTop += obj.offsetTop + borderT;
        obj = obj.offsetParent;
    }
    return {
        left: iLeft - bL,
        top: iTop - bT,
    };
}
export default {
    name: 'Bar',
    props: ['chartData', 'title'],
    data() {
        return {};
    },
    mounted() {
        console.log(this.chartData, 'chartData');
        let vm = this;
        var data = [];
        var data2 = [];
        let maxarr = this.chartData.sort((a, b) => b.num - a.num);
        let max = maxarr.length > 0 ? maxarr[0].num : 1000;
        this.chartData.forEach((item) => {
            let num = Math.floor(Math.random() * 57);
            let num2 = Math.floor(Math.random() * 30 + 63);
            if (item.type == 1) {
                data.push({
                    value: [num, item.num],
                    type: item.type,
                    id: item.id,
                });
            } else {
                data2.push({
                    value: [num2, item.num],
                    type: item.type,
                    id: item.id,
                });
            }
        });
        let option = {
            legend: {
                data: ['访问', '被访问'],
            },
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                // containLabel: true,
            },
            polar: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
            },
            angleAxis: {
                type: 'value',
                min: 0,
                max: max,
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
            radiusAxis: {
                type: 'value',
                min: 0,
                max: 90,
                splitNumber: 3,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['transparent', 'transparent', 'red'],
                    },
                },
            },
            series: [
                {
                    coordinateSystem: 'polar',
                    name: '访问',
                    symbolSize: 15,
                    itemStyle: {
                        normal: {
                            color: '#009999',
                        },
                    },
                    label: {
                        normal: {
                            show: false,
                            // formatter: '{b}',
                            position: 'inside',
                            textStyle: {
                                color: '#fff',
                                fontSize: 15,
                            },
                        },
                    },
                    type: 'scatter',
                    data: data,
                },
                {
                    coordinateSystem: 'polar',
                    name: '被访问',
                    symbolSize: 15,
                    label: {
                        normal: {
                            show: false,
                            formatter: '{b}',
                            position: 'inside',
                            textStyle: {
                                color: '#fff',
                                fontSize: 15,
                            },
                        },
                    },
                    type: 'scatter',
                    data: data2,
                },
            ],
        };
        // eslint-disable-next-line no-undef
        var myChart = echarts.init(this.$refs.myEcharts);
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        });
        window.addEventListener('click', function () {
            if (document.getElementsByClassName('echart-tip').length > 0) {
                let curNode = document.getElementsByClassName('echart-tip')[0];
                let parentNode = curNode.parentNode;
                parentNode.parentNode && parentNode.parentNode.removeChild(parentNode);
            }
        });
        myChart.on('click', function (params) {
            console.log('params', params);
            if (params.data.type == 1) {
                if (document.getElementsByClassName('echart-tip').length > 0) {
                    let curNode = document.getElementsByClassName('echart-tip')[0];
                    let parentNode = curNode.parentNode;
                    parentNode.parentNode && parentNode.parentNode.removeChild(parentNode);
                }
                return;
            }
            if (document.getElementsByClassName('echart-tip').length > 0) {
                let curNode = document.getElementsByClassName('echart-tip')[0];
                let parentNode = curNode.parentNode;
                parentNode.parentNode && parentNode.parentNode.removeChild(parentNode);
            }
            let x = getOffset(vm.$refs.myEcharts).left;
            let y = getOffset(vm.$refs.myEcharts).top;
            let offsetX = params.event.offsetX;
            let offsetY = params.event.offsetY;
            let left = x + offsetX + 20;
            let top = y + offsetY - 25;
            vm.$openDialog(ChartTip)({
                styleObj: { top: top + 'px', left: left + 'px' },
                curData: params.data,
            })
                .then(() => vm.$message.success('任务成功'))
                .catch(() => vm.$message.warning('任务失败'));
        });
    },
};
</script>

<style scoped lang="scss">
.echarts {
    width: 100%;
    height: 100%;
}
</style>
