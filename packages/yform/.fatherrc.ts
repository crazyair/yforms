// export default {
//   target: 'node',
//   disableTypeCheck: true,
//   cjs: { type: 'babel', lazy: true },
//   extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],
// };

// import { IBundleOptions } from 'father';

// const options: IBundleOptions = {
//     entry: 'src/index.tsx',
//     cjs: 'rollup',
//     esm: 'rollup',
//     // cjs: 'babel',
//     // esm: 'babel',
//     // runtimeHelpers: true,
//     preCommit: { eslint: true, prettier: true },
//     // extraBabelPlugins: [['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
// };

// export default options;

// export default {
//     target: 'node',
//     disableTypeCheck: true,
//     esm: 'babel',
//     // cjs: { type: 'babel', lazy: true },
//     extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],
// };

// export default {
//     // esm: { type: 'rollup' },
//     // cjs: { type: 'rollup' },
//     // umd: {
//     //     name: 'DynamicForm',
//     //     globals: { react: 'React' },
//     // },
//     // disableTypeCheck: true,
//     // entry: 'packages/father-doc/src/index.tsx',
//     cjs: 'babel',
//     esm: 'babel',
//     // namedExports: {
//     //   'react-is': [
//     //     'isFragment',
//     //   ]
//     // },
//     // extraBabelPlugins: [
//     //     [
//     //         'babel-plugin-import',
//     //         { libraryName: 'antd-mobile', libraryDirectory: 'es', style: true },
//     //     ],
//     // ],
// };

// export default {
//     // entry: 'packages/father-doc/src/index.tsx',
//     // target: 'node',
//     // disableTypeCheck: true,
//     // cjs: { type: 'babel', lazy: true },
//     cjs: 'babel',
//     // esm: 'babel',
//     // entry: 'src/index.tsx',
//     // doc: { typescript: true },
//     // esm: 'rollup',
//     // extraBabelPlugins: ['@babel/plugin-proposal-optional-chaining'],

//     // entry: 'src/index.tsx',
//     // cjs: 'rollup',
//     // esm: 'rollup',
//     // cjs: 'babel',
//     // esm: 'babel',
//     // runtimeHelpers: true,
//     // preCommit: { eslint: true, prettier: true },
// };

export default {
    target: 'node',
    // extraBabelPlugins: [
    //     ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    // ],
    runtimeHelpers: true,
    esm: 'babel',
    // cjs: { type: 'babel', lazy: true },
};
