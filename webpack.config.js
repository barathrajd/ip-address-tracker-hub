const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  return {
    mode: 'development',
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, './public'),
      historyApiFallback: true,
    },
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: 'defaults',
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: env.NODE_ENV === 'development',
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 0,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  };
};
