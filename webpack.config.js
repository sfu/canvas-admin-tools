const { resolve } = require('path');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: [resolve(__dirname, 'src/client/index.js')],
  output: {
    path: resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },

          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },

          // mostly lifted from react-scripts webpack config, with production stuff removed
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: { importLoaders: 1, sourceMap: false },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }),
                  ],
                  sourceMap: false,
                },
              },
            ],
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },

          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css

          {
            test: cssModuleRegex,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    mode: 'local',
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                  },
                  importLoaders: 1,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }),
                  ],
                  sourceMap: false,
                },
              },
            ],
          },

          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: 'file-loader',
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },
};
