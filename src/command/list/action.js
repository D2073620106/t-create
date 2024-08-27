
const {log} = require("../../utils/tools");
const service = require('./service')


module.exports = function (name, options){
  log.debug(name, options)
  const {type} = options
  if(type && name){
    service.showDetail(service.findByNameAndType(name, type))
  }else if(type){
    service.showList(service.findByType(type))
  }else if(name){
    service.showDetail(service.findByName(name))
  }else{
    service.showList(service.findList())
  }
}
