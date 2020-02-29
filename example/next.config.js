/* eslint @typescript-eslint/no-var-requires: 0 */
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = (phase, {defaultConfig}) => {
  return {
    ...defaultConfig,

    webpack: (config) => {
      /**
       * Dotenv
       */
      if (isDev) {
        config.plugins.push(
          new Dotenv({
            systemvars: true,
            safe: true,
            expand: true
          })
        )
      }

      if (!isDev) {
        config.plugins.push(
          new webpack.EnvironmentPlugin({
            REACT_APP_MAPBOX_ACCESS_TOKEN: null
          })
        )
      }
      config.resolve.alias['@components'] = path.join(__dirname, 'components')
      config.resolve.alias['@lib'] = path.join(__dirname, 'lib')
      config.resolve.alias['@pages'] = path.join(__dirname, 'pages')
      config.resolve.alias['@hooks'] = path.join(__dirname, 'hooks')

      return config
    }
  }
}
