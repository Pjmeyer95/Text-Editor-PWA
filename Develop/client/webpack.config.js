const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'],
      }),

      // Generate the Web App Manifest file
      new WebpackPwaManifest({
        name: 'My App',
        short_name: 'App',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
      }),

      // Inject the service worker into the generated HTML files
      new InjectManifest({
        swSrc: './src/service-worker.js',
        exclude: [/\.map$/, /manifest$/, /service-worker\.js$/],
      }),
    ],

    module: {
      rules: [
        // CSS loaders
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Babel loader for JavaScript files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
    },
  };
};
