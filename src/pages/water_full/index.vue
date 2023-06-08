<template>
    <div class="waterfall wf-wrap" ref="waterfall" v-infinite-scroll="onScroll" infinite-scroll-immediate="false">
        <ul>
            <transition-group name="list" tag="li">
                <li
                    v-for="item in waterfallList"
                    :key="item.id"
                    class="wf-item"
                    :style="{
                        top: item.top + 'px',
                        left: item.left + 'px',
                        width: item.width + 'px',
                        height: item.height + 'px',
                    }"
                >
                    <img v-if="item.src" :src="item.src" />
                    <p v-else>{{ item.desc }}</p>
                    <h3>{{ item.title }}</h3>
                </li>
            </transition-group>
        </ul>
    </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import dataList from './data.js';
import { VueThrottle } from '@/assets/js/public_fun.js';
// 引入队列处理类（为什么要用队列方式处理：因为图片加载是异步的，为保证数据展示顺序与返回数据保持一致）
import Queue from './Queue.js';
// 创建队列列表对象
let queue = new Queue();
export default {
    name: 'Waterfall',
    data() {
        return {
            waterfallList: [],
            waterfallCol: 4,
            colWidth: 236,
            marginRight: 10,
            marginBottom: 10,
            colHeights: [],
            totalPage: 0,
            imgOtherHeigh: 80, // 图片展示数据如果有其他部分的高度，没有的话就设置为0
            noImgHeigh: 150, //非图片展示数据盒子的高度
            listQuery: {
                page: 1,
                limit: 10,
                sort: '+id',
            },
            loading: false,
            show: true,
        };
    },
    mounted() {
        this.totalPage = Math.ceil(dataList.length / this.listQuery.limit);
        this.init();
    },
    methods: {
        init() {
            // 初始化时，每栏高度都为0
            this.colHeights = new Array(this.waterfallCol);
            for (let i = 0; i < this.colHeights.length; i++) {
                this.colHeights[i] = 0;
            }
            this.colWidth =
                (this.$refs.waterfall.clientWidth - (this.waterfallCol - 1) * this.marginRight) / this.waterfallCol;
            this.loadImgs();
        },

        loadImgs() {
            // 模拟从api获取数据并将请求到的数据放入队列里
            let list = []; //
            dataList.forEach((item, index) => {
                // 本地模拟分页
                item.id = uuidv4();
                let min = (this.listQuery.page - 1) * this.listQuery.limit;
                let max = min + this.listQuery.limit + 1;
                if (index >= min && index < max) {
                    // 数据放入队列里
                    queue.enqueue(item);
                }
            });
            console.log(this.listQuery.page, '第' + this.listQuery.page + '页数据');
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                if (queue.isEmpty()) {
                    return;
                }
                // 处理队列里的数据
                let first = queue.front();
                this.handelMessageAction(first);
            }, 1000);
        },
        dataEndHandel() {
            // 处理一条数据队列就删除一条
            queue.dequeue();
            // 判断队列中的数据是否处理完，否则继续递归处理
            if (!queue.isEmpty()) {
                let first = queue.front();
                this.handelMessageAction(first);
            }
        },
        handelMessageAction(item) {
            if (!item.url) {
                // 非图片数据直接处理
                let obj = {};
                obj.id = item.id;
                obj.title = item.title;
                obj.desc = item.desc;
                obj.height = this.noImgHeigh;
                obj.width = this.colWidth;
                this.waterfallList.push(obj);
                this.rankImgs(obj);
                this.dataEndHandel();
            } else {
                // 图片需要等加载完成在处理
                let img = new Image();
                img.src = item.url;
                img.onload = () => {
                    let obj = {};
                    obj.id = item.id;
                    obj.title = item.title;
                    obj.desc = item.desc;
                    obj.height = (img.height * this.colWidth) / img.width + this.imgOtherHeigh;
                    obj.width = this.colWidth;
                    obj.src = item.url;
                    this.waterfallList.push(obj);
                    this.rankImgs(obj);
                    this.dataEndHandel();
                };
            }
        },
        loadMore() {
            if (this.$refs.waterfall.clientHeight + this.$refs.waterfall.scrollTop > this.filterMin().minHeight) {
                setTimeout(() => {
                    this.loadImgs();
                }, 200);
            }
        },

        rankImgs(imgData) {
            let min = this.filterMin();
            imgData.top = min.minHeight;
            imgData.left = min.minIndex * (this.colWidth + this.marginRight);

            this.colHeights[min.minIndex] += imgData.height + this.marginBottom;
        },

        filterMin() {
            let minHeight = Math.min.apply(null, this.colHeights);
            return {
                minHeight: minHeight,
                minIndex: this.colHeights.indexOf(minHeight),
            };
        },
        // 节流
        load: VueThrottle('onScroll'),
        onScroll() {
            this.listQuery.page++;
            console.log(this.listQuery.page, this.totalPage);
            if (this.listQuery.page > this.totalPage) {
                console.log('没有数据了');
                this.listQuery.page = this.totalPage;
                return;
            }

            this.loadMore();
        },
    },
};
</script>

<style lang="scss" scoped>
ul li {
    list-style: none;
}

.wf-wrap {
    position: relative;
    width: 800px;
    height: 70vh;
    padding-bottom: 40px;
    margin: 30px auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
}
.wf-item {
    position: absolute;
    background-color: #fff;
}
.wf-item img {
    max-width: 100%;
}
.list-enter-active,
.list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.observer {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;

    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    line-height: 40px;
    color: #666;
    i {
        font-size: 14px;
        margin-right: 5px;
    }
    span {
        font-size: 14px;
    }
}
</style>
