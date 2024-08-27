
const {log} = require("../../utils/tools");
const _ =  require('lodash')
const service= require("./service");



module.exports = async function (name, options) {
  log.debug(name, options)
  const {all} = options
  let showText = '请输入完整指令，dmc r -h 查看帮助'
  if (all && name) {
    // 移除分类下的所有模板
    showText = await service.removeByType(name)
  } else if (name) {
    // 移除单个模板
    showText = await service.remove(name)
  } else if (all) {
    showText = await service.removeAll()
    // 移除所有模板
  }
  log.success(showText);
}
