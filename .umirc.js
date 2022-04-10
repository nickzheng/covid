export default {
  chainWebpack(config) {
    config.module.rule('ttf').test(/.ttf$/).use('file-loader').loader('file-loader');
  },
  hash: true,
  treeShaking: true,
  routes: require('./src/pages/router'),
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'COVID-19',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
