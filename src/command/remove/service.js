const helper = require("../../template/helper");
const Table = require("cli-table3");
const {log} = require("../../utils/tools");
const inquirer = require("inquirer");
const {BaseError} = require("../../utils/error");
const config = require("../../config/index");
const {chooseTemplate} = require("../../template/chooseTools");


async function conform(text='确认删除所有模板') {
  const questions = [
    {
      type: 'input',
      name: 'pass',
      message: text,
      mask: '*',
      default: 'y'
    }
  ];
  const answer = await inquirer.prompt(questions)
  return answer.pass
}

/**
 * 删除所有模板
 */
async function removeAll() {
  const pass = await conform()
  if (pass === 'yes' || pass === 'y') {
    helper.deleteAllTemplates()
    return `已删除所有模板`
  }
  return `已取消`
}


/**
 * 依据名称删除单个模板
 * @param name
 * @returns {Promise<string>}
 */
async function remove(name){
  const templates = helper.findByNameOrUUid(name)
  function deleteTemplate(model){
    helper.deleteTemplateFileOrDir(model)
    helper.removeConfigByName(model)
  }
  if(templates.length===1){
    deleteTemplate(templates[0])
    return `已删除${templates[0].name}模板`
  }else if(templates.length>1){
    const model = await chooseTemplate(templates,'请选择要删除的模板')
    deleteTemplate(model)
    return `已删除${model.name}模板`
  }else{
    return `未找到名称为${name}的模板`
  }
}

/**
 * 删除分类下的所有模板
 * @param type
 */
async function removeByType(type) {
  if (type === config.baseFolder) {
    return `基础 ${config.baseFolder} 不可删除`
  }
  const templateConfig = helper.readTemplateConfig()
  if (templateConfig[type]) {
    const pass = await conform(`确认删除${type}分类下的所有模板`)
    if(!(pass!=='yes' || pass!=='y')) return `已取消`
    helper.removeConfigByType(type)
    helper.deleteTemplateFileOrDirByType(type)
    return `已删除${type}分类下的模板`
  } else {
    return `未找到分类为${type}的模板`
  }
}

module.exports = {
  removeAll,
  removeByType,
  remove
}
