import { IBundleOptions } from 'father';

const options: IBundleOptions = {
    entry: 'src/index.tsx',
    // cjs: 'rollup',
    esm: 'rollup',
    // cjs: 'babel',
    // esm: 'babel',
    preCommit: { eslint: true, prettier: true },
    // extraBabelPlugins: [['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
};

export default options;
