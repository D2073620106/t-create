
const path_ = require('path');
const {log, getCwdPath} = require("../../utils/tools");
const service = require('./service')
const config = require("../../config");
const {BaseError} = require("../../utils/error");
const {fileTools} = require("../../utils/file");
const _ = require('lodash')
const listService = require("../list/service");


module.exports = async function (key,value) {
  log.debug(key,value)
  if(!key && !value?.[0]){
    log.success('当前配置信息：')
    const newConfig = _.omit(config,['env'])
    listService.showDetail([newConfig])
    return
  }
  if(!config[key]){
    log.error('无此配置')
    return
  }
  const data = {}
  if(key ==='localTemplateSavePath'){
    value = value[0]
    if(!fileTools.isAbsPath(value)){
      value = path_.join(getCwdPath() , value)
    }
    if(!fileTools.isExist(value)){
      fileTools.createDir(value)
    }
    service.copyAllTemplateToNew(value)
    data[key] = value
  }
  if(key==='baseFolder'){
    value = value[0]
    const flag = service.updateBaseFolder(value)
    if(flag===0) return
    data[key] = value
  }
  if(key==='ignore'){
    data[key] = value
  }
  service.updateConfig(data)
  log.success(`已移动模板文件、修改${key}配置`);
}
