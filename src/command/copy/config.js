const commander = require("commander")
const {getCwdPath} = require("../../utils/tools");
const action = require("./action");
module.exports = {
  command:'copy',
  alias:'cp',
  description:'简介：复制指定文件或目录到指定目录',
  addArgument: function(){
    return new commander.Argument('<path> <dir...>', '参数1 被复制的文件或目录地址；参数2 复制到哪个目录下，可以指定多个目标目录')
  },
  options:[
    {
      name:'name',
      alias:'n',
      description:'文件或文件夹名称',
      default:'',
      type:'<char>'
    },
    {
      name:'force',
      alias:'f',
      description:'是否覆盖目标文件或文件夹',
      default: false,
      type:''
    }
  ],
  action: action,
  // 介绍
  example:`
    eg:
      $ dmc copy index.js vueProject // 拷贝index.js到vueProject目录下
      $ dmc copy index.js vueProject -f // 拷贝index.js到vueProject目录下,并且覆盖已有index.js
      $ dmc copy vueTest vueProject  // 拷贝文件夹vueTest到vueProject目录下
      $ dmc copy index.js vueProject vueProject1 // 拷贝index.js到vueProject、 vueProject1目录下
      $ dmc copy index.js vueProject -n index_test.js // 拷贝index.js到vueProject目录下,并修改名称为index_test.js
    `
}
