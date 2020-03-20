export default {
  mode: 'site',
  title: 'father-doc-yform',
  favicon: '/favicon.ico',
  logo: '/logo.png',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
