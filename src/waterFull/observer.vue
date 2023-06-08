<template>
    <div class="observer">
        <i class="el-icon-loading" v-if="isLoading"></i><span>{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: 'Observer',

    props: {
        options: {
            type: Object,
            default: () => ({}),
        },

        hasMore: {
            type: Boolean,
            default: true,
        },

        isLoading: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            observer: null,
        };
    },

    computed: {
        text() {
            const { hasMore, isLoading } = this;

            if (!hasMore) {
                return '- 我是有底线的 -';
            }
            if (isLoading) {
                return '加载中...';
            }
            return '⠀';
        },
    },

    watch: {
        hasMore(v) {
            if (!v) {
                const { observer } = this;

                observer?.disconnect?.();
            }
        },
    },

    mounted() {
        const { init } = this;

        init();
    },

    destroyed() {
        const { observer } = this;

        observer?.disconnect?.();
    },

    methods: {
        init() {
            const { options } = this;

            this.observer = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    setTimeout(() => {
                        this.$emit('intersect');
                    }, 200);
                }
            }, options);

            this.observer.observe(this.$el);
        },
    },
};
</script>

<style lang="scss">
.observer {
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
