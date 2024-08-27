const create  = require('./create/index.js')
const save = require('./save/index.js')
const list = require('./list/index.js')
const remove = require('./remove/index.js')
const copy = require('./copy/index.js')
const update = require('./update/index.js')
const config = require('./config/index.js')

function registerProgram(program){
  function installModule(command){
    command.register(program)
  }
  // 配置模板模块
  installModule(config)
  // 存储模板模块
  installModule(save)
  // 创建模板到本地项目模块 | 创建项目
  installModule(create)
  // 查看记录模块
  installModule(list)
  // 移除模板模块
  installModule(remove)
  // 拷贝模板模块
  installModule(copy)
  // 更新模板模块
  installModule(update)
}

module.exports = {registerProgram}
