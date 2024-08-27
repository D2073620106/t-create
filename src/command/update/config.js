const commander = require("commander")
const action = require("./action");
module.exports = {
  command:'update',
  description:'简介：更新模板信息',
  addArgument: function(){
    return new commander.Argument('[name | uuid]', '名称 | 路径')
  },
  options:[
    {
      name:'name',
      alias:'n',
      description:'更新名称',
      default:'',
      type:'<char>'
    },
    {
      name:'desc',
      alias:'d',
      description:'更新介绍',
      default:'',
      type:'<char>'
    },
    {
      name:'gitname',
      alias:'gn',
      description:'更新git name',
      default:'',
      type:'<char>'
    },
    {
      name:'gitemail',
      alias:'ge',
      description:'更新git email',
      default:'',
      type:'<char>'
    },
    {
      name:'branch',
      alias:'b',
      description:'更新git 分支',
      default:'',
      type:'<char>'
    }
  ],
  action: action,
  // 介绍
  example:`
    eg:
      $ dmc update test -n test_new  // 更新test模板的名称为test_new
      $ dmc update test -d 测试  // 更新test模板的简介为测试
      $ dmc update test -ge 123@email.com  // 更新test模板的git email为123@email.com 
      $ dmc update test -gn duan  // 更新test模板的git name为duan
      $ dmc update test -b dev  // 更新test模板的git分支为dev
    `
}
