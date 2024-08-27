const commander = require("commander")
const action = require("./action");
module.exports = {
  command:'config',
  description:'简介：更新工具配置',
  arguments: [
    {
      name:'[key]',
      desc:'属性'
    },
    {
      name:'[value...]',
      desc:'值'
    },
  ],
  action: action,
  // 介绍
  example:`
    eg:
      $ dmc config ignore node_modules,.git  // 设置保存模板时需要忽略的目录或文件
      $ dmc config localTemplateSavePath ./  // 设置模板保存存储路径
      $ dmc config baseFolder common1  // 设置保存模板时的存储类型，localTemplateSavePath下的一个细分路径
    `
}
