import { IBundleOptions } from 'father-build/src/types';

const options: IBundleOptions = {
  // entry: 'src/index.tsx',
  // cjs: 'rollup',
  // esm: 'rollup',
  // target: 'node',
  runtimeHelpers: true,
  cjs: { type: 'babel', lazy: true },
  esm: 'babel',
  cssModules: false, // https://github.com/umijs/father/issues/131
  // extractCSS: true,
  // lessInBabelMode: true,
  extraBabelPlugins: [
    ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
};

export default options;
