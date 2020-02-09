export default {
    // for GitHub Pages before prerender be supported
    history: 'hash',
    publicPath: '/father-doc-yform/',
    // doc: {
    //   title: 'father-doc',
    // },
    extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
};
