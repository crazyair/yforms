export default {
  // for GitHub Pages before prerender be supported
  // history: { type: 'hash' },
  // publicPath: '/father-doc-yform/',
  doc: {
    mode: 'site',
    title: 'father-doc-yform',
  },
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
};
