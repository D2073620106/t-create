const commander = require("commander")
const action = require("./action");
module.exports = {
  command:'remove',
  alias:'r',
  description:'简介：该指令可以移除单个模板、移除所有模板、移除某个分类的模板',
  addArgument: function(){
    return new commander.Argument('[name | uuid]', '模板名称 | uuid ')
  },
  options:[
    {
      name:'all',
      alias:'a',
      description:'移除全部模板, 后可以拼接分类，不拼接分类则移除全部模板',
      default: false,
      type: ''
    }
  ],
  action: action,
  // 介绍
  example:`
    eg:
      $ dmc remove test  // 移除名称为test的模板，有重名则展示列表，并提示
      $ dmc remove -a vue // 移除vue分类下的所有模板
      $ dmc remove -a  // 移除所有模板
    `
}
