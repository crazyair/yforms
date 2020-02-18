export default {
  // for GitHub Pages before prerender be supported
  history: 'hash',
  publicPath: '/father-doc-yform/',
  disableCSSModules: true,
  doc: {
    mode: 'site',
    title: 'father-doc-yform',
  },
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
};
