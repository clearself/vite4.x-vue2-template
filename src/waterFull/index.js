import Macy from './macy.js';

export default {
    data() {
        return {
            masonry: null,
            container: 'templet-list',
        };
    },

    create() {
        const { resize } = this;

        window.addEventListener('resize', resize);
    },

    beforeDestroy() {
        const { resize } = this;

        window.removeEventListener('resize', resize);
    },

    methods: {
        initMacy(option) {
            const config = Object.assign(
                {
                    trueOrder: false,
                    waitForImages: true,
                    useOwnImageLoader: false,
                    debug: false,
                    margin: {
                        x: 32,
                        y: 18,
                    },
                    columns: 6,
                },
                option,
            );

            const { container } = this;

            this.masonry = new Macy({
                ...config,
                container: `.${container}`,
            });

            this.masonry.runOnImageLoad(() => {
                this.masonry.recalculate(true);
            });
        },

        resize() {
            const { masonry } = this;
            if (masonry) {
                masonry.recalculate(true);
            }
        },
    },
};
