const helper = require("../../template/helper");
const {fileTools} = require("../../utils/file");
const  _ = require("lodash");
const {removeModelProps} = require("../../template/model");
const {log} = require("../../utils/tools");


/**
 * 模板是否存在
 * @param _model
 * @returns {boolean|this is string[]}
 */
function templateIsExist(_model){
  const model = _.cloneDeep(_model)
  const templateJson = helper.readTemplateConfig();
  const inJsonFile = !!templateJson?.[model.type]?.[model.name]
  const inFolder = fileTools.isExist(model.savePath)
  log.debug(inFolder, inJsonFile)
  return model.linkType === 'git' ? inJsonFile : inFolder || inJsonFile
}


function saveTemplate(model){
  if(model.linkType!=='git'){
    helper.saveTemplateFileOrDir(model)
  }
  // 移除model中不需要的属性
  const model_ = removeModelProps(model)
  helper.addConfig(model_)

}


function deleteTemplate(model){
  if(model.linkType!=='git'){
    helper.deleteTemplateFileOrDir(model)
  }
  helper.removeConfigByName(model)
}


module.exports = {
  templateIsExist,
  saveTemplate,
  deleteTemplate
}
