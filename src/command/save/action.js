
const {log} = require("../../utils/tools");
const {createModel, updateModel} = require("../../template/model");
const {BaseError} = require("../../utils/error");
const service = require('./service')

module.exports = function (path, options){
  let model = createModel(path)
  model = updateModel(model, options)
  log.debug(model)
  // 1、检查是否文件或文件夹或git是否已存在，只要判断name就行
  const isExist = service.templateIsExist(model)
  // 2、存在检查是否需要强制覆盖，否则停止
  if(!options.force && isExist){
    throw new BaseError('该名称模板已存在，请更换名称或删除原来的模板后保存')
  }else if(isExist && options.force){
    service.deleteTemplate(model)
  }
  // 3、保存模板文件到本地，存储模板信息到template.json
  service.saveTemplate(model)
  // 4、给出提示
  log.success('模板保存成功');
}
