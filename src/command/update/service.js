const helper = require("../../template/helper");
const Table = require("cli-table3");
const {log} = require("../../utils/tools");
const {chooseTemplate} = require("../../template/chooseTools");
const {BaseError} = require("../../utils/error");

/**
 * 更新模板属性
 * @param model
 * @param props
 * @param val
 */
function updateConfig(model,props,val){
  helper.removeConfigByName(model)
  model[props] = val
  helper.addConfig(model)
}


async function updateTemplate(nameOrUUid, props, val) {
  const res = helper.findByNameOrUUid(nameOrUUid)
  if(res.length===0){
    return `未查询到名称或uuid为${nameOrUUid}的模板`
  }
  let model = {}
  res.length === 1 ? model = res[0] : model = await chooseTemplate(res, '请选择要修改的模板')
  updateConfig(model, props, val)
  return `已更新`
}


module.exports = {
  updateTemplate,
}
