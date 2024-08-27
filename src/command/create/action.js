
const {log, getCwdPath} = require("../../utils/tools");
const {createModel, updateModel} = require("../../template/model");
const {BaseError} = require("../../utils/error");
const service = require('./service')
const {fileTools} = require("../../utils/file");
const _path = require("path");

module.exports = async function (name, options) {
  log.debug(name, options)
  const model = await service.getTemplateModel(name)
  const targetPath = _path.join(getCwdPath(), options.name || model.name)
  if(options.force){
     fileTools.delFileOrDir(targetPath)
  }
  await service.createTemplate(model, targetPath)
  if (options.replace) {
    await service.textReplace(targetPath, options.replace, model)
  }
  log.success('模板复制成功');
}
