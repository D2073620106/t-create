
const {log} = require("../../utils/tools");
const service = require('./service')
const listService = require('../list/service')


module.exports = async function (name, options) {
  log.debug(name, options)
  // const {name,branch,gitname,gitemail,desc} = options
  const props = Object.keys(options)
  let tip = ''
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (options[prop]) {
       tip = await service.updateTemplate(name, prop, options[prop])
    }
  }
  listService.showDetail(listService.findByName(name))
  log.success(tip);
}
