// import path from 'path';

import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
    treeShaking: true,
    // alias: {
    //     'father-doc-yform': path.resolve(__dirname, './src/index.tsx'),
    // },
    // routes: [
    //   {
    //     path: '/',
    //     component: '../layouts/index',
    //     routes: [
    //       { path: '/', component: '../pages/index' }
    //     ]
    //   }
    // ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: false,
                // dynamicImport: { webpackChunkName: true },
                title: 'father-doc-yform',
                // routes: {
                //     exclude: [/components\//],
                // },
            },
        ],
    ],
};

export default config;
