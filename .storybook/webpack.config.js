const path = require('path')

module.exports = ({ config, mode }) => {
  config.resolve.modules.push(path.resolve('./'))

  return config
}
