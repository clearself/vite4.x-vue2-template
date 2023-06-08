import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import legacy from '@vitejs/plugin-legacy'; // 为打包后的文件提供传统浏览器兼容性支持
export default ({ mode }) => {
    const { VITE_PORT, VITE_BASE_URL } = loadEnv(mode, process.cwd());

    return defineConfig({
        base: VITE_BASE_URL,
        plugins: [
            vue2(),
            legacy({
                targets: ['defaults', 'ie >= 11', 'chrome 52'],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            }),
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
            /** 暂时先加.vue, .js, .json */
            extensions: ['.vue', '.js', '.json'],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/assets/css/mixin.scss";`,
                },
            },
        },
        server: {
            // 是否开启 https
            https: false,
            // 端口号
            port: VITE_PORT,
            // 监听所有地址
            host: 'localhost',
            // 服务启动时是否自动打开浏览器
            open: true,
            // 允许跨域
            cors: true,
            // 自定义代理规则
            proxy: {
                '/api': {
                    target: 'http://10.10.110.48:17999/', // 新环境地址开发
                    changeOrigin: true,
                    ws: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },

                //图片服务代理
                '/imgServer': {
                    //target: 'http://192.168.91.218:8081/', //需要代理的地址
                    target: 'http://10.10.109.203:7699/', //需要代理的地址
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/imgServer/, ''),
                },
            },
        },
        build: {
            // 设置最终构建的浏览器兼容目标
            target: 'es2015',
            // 构建后是否生成 source map 文件
            sourcemap: false,
            //  chunk 大小警告的限制（以 kbs 为单位）
            chunkSizeWarningLimit: 2000,
            // 启用/禁用 gzip 压缩大小报告
            reportCompressedSize: false,
        },
    });
};
