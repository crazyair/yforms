export default {
  mode: 'site',
  title: 'yform',
  favicon: '/favicon.ico',
  logo: '/logo.png',
  menus: {
    '/guide': [
      {
        title: '介绍',
        children: ['guide/index', 'guide/getting-started'],
      },
    ],
  },
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
