export default {
  mode: 'site',
  title: 'father-doc-yform',
  favicon: 'https://ae01.alicdn.com/kf/Hdaaad95bedb74b1692208577a8fc972f2.png',
  logo: 'https://ae01.alicdn.com/kf/Hdaaad95bedb74b1692208577a8fc972f2.png',
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
