const path = require('path')
const {readConfig} = require("./core");

const config = {
  localTemplateSavePath: path.join(__dirname, '../templates'),
  baseFolder: 'common',
  ignore:['node_modules','package-lock.json'],
  env:{
    debug: false
  },
  ...readConfig()
}


module.exports = config
